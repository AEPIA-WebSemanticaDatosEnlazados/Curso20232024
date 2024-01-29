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


@app.get('/centers')
def get_centers(center_type: str = None):
    """
        Function to retrieve the centers of the dataset.

        -----------
        # Arguments

        - `center_type`: `str`
            - The type of center to be used in the query.\
            This parameter is optional and defaults to `None`,\
            meaning that no filtering will be done.
    """
    center_type_restriction = '' if center_type is None or center_type == 'ALL' else \
        f'?center dbpedia:type "{center_type}"'

    query = f'''
        PREFIX schema: <http://schema.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX tc: <https://tenerifecenters.com/ontology/centers#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX dbpedia: <http://dbpedia.org/resource/>

        SELECT ?name ?activity_name ?city_name ?city_linked_uri ?streetAddress ?postalCode ?web ?email ?telephone ?fax ?creation_date ?update_date ?center_type ?longitude ?latitude
        WHERE {{ 
            ?center a tc:Center .
            ?center dc:title ?name .
            ?center tc:hasActivity ?activity .
            ?activity dc:title ?activity_name .
            ?center dbpedia:type ?center_type .
            ?center schema:longitude ?longitude .
            ?center schema:latitude ?latitude .
            {center_type_restriction}



            OPTIONAL {{
                ?center schema:containedIn ?city .
                ?city a schema:City .
                ?city schema:name ?city_name .
                ?city owl:sameAs ?city_linked_uri .
            }}

            OPTIONAL {{
                ?center schema:address ?address .
                ?address schema:streetAddress ?streetAddress .
                ?address schema:postalCode ?postalCode .
            }}

            OPTIONAL {{
                ?center schema:web ?web .
            }}

            OPTIONAL {{
                ?center schema:email ?email .
            }}

            OPTIONAL {{
                ?center schema:telephone ?telephone .
            }}

            OPTIONAL {{
                ?center schema:fax ?fax .
            }}
        }}
    '''
    centers = []

    count = 0
    for row in g.query(query):
        count += 1
        centers.append(
            {
                'name' : row[0],
                'activity' : row[1],
                'city_name' : row[2],
                'city_linked_uri' : row[3],
                'street_address' : row[4],
                'postal_code' : row[5],
                'web' : row[6],
                'email' : row[7],
                'telephone' : row[8],
                'fax' : row[9],
                'creation_date' : row[10],
                'update_date' : row[11],
                'center_type' : row[12],
                'longitude' : row[13],
                'latitude' : row[14]
            }
        )

    print(count)
    return centers
