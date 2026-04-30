from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_automation():
    return {'status': 'ok', 'component': 'automation'}
