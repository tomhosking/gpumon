FROM nvidia/cuda:10.0-base
RUN apt-get update
RUN apt-get install -y python3-pip

ADD requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ADD . .
ENTRYPOINT ["python3"]
CMD ["-u", "app.py"]