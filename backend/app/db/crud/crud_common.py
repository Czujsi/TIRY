from sqlalchemy.orm import Session


def get_or_404(query_result, message: str = "Not found"):
    if not query_result:
        raise Exception(message)
    return query_result
