"""Create exhaustive profile model

Revision ID: 6e33b127c607
Revises: 725c9f7abdcf
Create Date: 2025-09-27 16:09:44.299703

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6e33b127c607'
down_revision: Union[str, Sequence[str], None] = '725c9f7abdcf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('birthdate', sa.Date(), nullable=True),
    sa.Column('hr_max_manual', sa.Integer(), nullable=True),
    sa.Column('hr_max_auto', sa.Integer(), nullable=True),
    sa.Column('hr_resting_manual', sa.Integer(), nullable=True),
    sa.Column('hr_resting_auto', sa.Integer(), nullable=True),
    sa.Column('lthr_manual', sa.Integer(), nullable=True),
    sa.Column('lthr_auto', sa.Integer(), nullable=True),
    sa.Column('vma_manual', sa.Float(), nullable=True),
    sa.Column('vma_auto', sa.Float(), nullable=True),
    sa.Column('tlim_vma_manual', sa.Integer(), nullable=True),
    sa.Column('ftp_manual', sa.Integer(), nullable=True),
    sa.Column('ftp_auto', sa.Integer(), nullable=True),
    sa.Column('endurance_index_manual', sa.Float(), nullable=True),
    sa.Column('endurance_index_auto', sa.Float(), nullable=True),
    sa.Column('aerobic_coupling_avg', sa.Float(), nullable=True),
    sa.Column('hrv_rmssd_manual', sa.Integer(), nullable=True),
    sa.Column('hrv_rmssd_daily', sa.Integer(), nullable=True),
    sa.Column('sleep_avg_duration', sa.Float(), nullable=True),
    sa.Column('sleep_avg_score', sa.Integer(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('owner_id')
    )
    op.create_index(op.f('ix_profiles_id'), 'profiles', ['id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_profiles_id'), table_name='profiles')
    op.drop_table('profiles')