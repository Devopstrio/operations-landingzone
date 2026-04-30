from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_incidents():
    return []
@router.post('/create')
def create_incident():
    return {'status': 'created'}
