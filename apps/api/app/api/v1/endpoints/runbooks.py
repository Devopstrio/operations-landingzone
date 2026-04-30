from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_runbooks():
    return []
@router.post('/execute')
def execute_runbook():
    return {'status': 'executing'}
