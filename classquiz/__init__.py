import sentry_sdk
from fastapi import FastAPI, Request
from sentry_sdk.integrations.redis import RedisIntegration
from socketio import ASGIApp
from starlette.middleware.sessions import SessionMiddleware

from classquiz.config import settings
from classquiz.db import database
from classquiz.routers import users, quiz, utils, stats, storage, search, testing_routes
from classquiz.socket_server import sio
from classquiz.helpers import meilisearch_init

settings = settings()
if settings.sentry_dsn:
    sentry_sdk.init(dsn=settings.sentry_dsn, integrations=[RedisIntegration()])
app = FastAPI(redoc_url="", docs_url="/api/docs")
app.state.database = database


@app.middleware("http")
async def sentry_exception(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        with sentry_sdk.push_scope() as scope:
            scope.set_context("request", request)
            sentry_sdk.capture_exception(e)
        raise e


@app.on_event("startup")
async def startup() -> None:
    database_ = app.state.database
    if not database_.is_connected:
        await database_.connect()
    await meilisearch_init()


@app.on_event("shutdown")
async def shutdown() -> None:
    database_ = app.state.database
    if database_.is_connected:
        await database_.disconnect()


app.add_middleware(SessionMiddleware, secret_key=settings.secret_key)
app.include_router(users.router, tags=["users"], prefix="/api/v1/users")
app.include_router(quiz.router, tags=["quiz"], prefix="/api/v1/quiz")
app.include_router(utils.router, tags=["utils"], prefix="/api/v1/utils")
app.include_router(stats.router, tags=["stats"], prefix="/api/v1/stats")
app.include_router(storage.router, tags=["storage"], prefix="/api/v1/storage")
app.include_router(search.router, tags=["search"], prefix="/api/v1/search")
app.include_router(testing_routes.router, tags=["internal", "testing"], prefix="/api/v1/internal/testing")
app.mount("/", ASGIApp(sio))
