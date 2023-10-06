import React from 'react'
import { TChildren } from '../../types/types'
import { Card } from '@mui/material'

const OverviewCard = ({ children }: TChildren) => {
    return (
        <Card
            sx={{
                borderRadius: '10px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: 'none',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: '#C7AEDB',
                    '& .icon': {
                        backgroundColor: '#ffffff',
                    },
                    '& .text': {
                        color: '#ffffff',
                    },
                },
            }}
        >
            {children}
        </Card>
    )
}

export default OverviewCard
