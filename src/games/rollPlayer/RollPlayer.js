import React from 'react'
import Tabs from '../../shared/Tabs'

function RollPlayer() {
    const tabs = [
        {label: 'Setup', content: <div/>}
    ]
    return <Tabs title={'Roll Player'} tabs={tabs}/>

}

export default RollPlayer
