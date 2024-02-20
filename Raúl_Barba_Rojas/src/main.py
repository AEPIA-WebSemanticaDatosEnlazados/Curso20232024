"""
    Module to implement a 
"""

from dotenv import load_dotenv
from rdflib import Graph

g = Graph()

g.parse('../data/rdf/ProyectoFinal.ttl', format = 'ttl')

query = '''
    SELECT ?name ?activity_name
    WHERE { 
        ?center a tc:Center .
        ?center dc:title ?name .
        ?center tc:hasActivity ?activity .
        ?activity dc:title ?activity_name .
    }
'''

for row in g.query(query):
    print(row[0], '|', row[1])
