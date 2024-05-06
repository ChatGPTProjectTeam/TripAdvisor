FROM python:3.11

COPY ./.env /backend/.env
COPY ./requirements.txt /backend/requirements.txt

RUN pip install --upgrade pip && pip install poetry
RUN pip install -r /backend/requirements.txt

COPY ./ /backend
WORKDIR /

CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
