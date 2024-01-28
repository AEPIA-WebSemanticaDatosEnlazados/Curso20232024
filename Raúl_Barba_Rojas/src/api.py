"""
    Module to implement a Python API using FastAPI for\
    the final proyect of the subject: Semantic Web and Linked\
    Data.
"""

import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from rdflib import Graph

# Retrieving API configurations
CONFIGURATION_FILE = 'config.env'
load_dotenv(CONFIGURATION_FILE)

# Defining the dataset file path
DATASET_FILE_PATH = os.environ.get('DATASET_FILE_PATH').strip()

# Creating an API object
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

# Loading the graph (if not possible the execution will stop)
g = Graph()

try:
    g.parse(DATASET_FILE_PATH, format = 'ttl')
except:
    logging.error('[TC-API] Cannot load the dataset file, reset the configuration and try again.')
    exit()


@app.get('/')
def get_home_page():
    """
        Function to retrieve the home page.
    """
    return FileResponse('static/index.html')


@app.get('/centers/')
def get_centers():
    """
        Function to retrieve the centers of the dataset.
    """
    query = '''
        SELECT ?name ?activity_name
        WHERE { 
            ?center a tc:Center .
            ?center dc:title ?name .
            ?center tc:hasActivity ?activity .
            ?activity dc:title ?activity_name .
        }
    '''
    centers = []

    for row in g.query(query):
        centers.append(
            {
                'name' : row[0],
                'activity' : row[1]
            }
        )

    return centers
