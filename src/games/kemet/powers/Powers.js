import {makeStyles} from '@material-ui/styles'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Card from '../../../shared/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import powerData from './powerData'
import Power from './Power'

function Powers({modules, data, onDataChanged}) {
    const classes = useStyles()
    const [powerState, setPowerState] = useState(data.powers || [])

    const powers = useMemo(() => {
        return [
            ...(powerData.base),
            ...([]),
            ...(powerModules
                    .map(module => modules[module] ? powerData[module] : null)
                    .filter(x => x)
                    .reduce((acc, val) => ([...acc, ...val]), [])
            ),
        ].sort((a, b) => a.color.localeCompare(b.color))
    }, [modules])

    const updatePowerType = useCallback(() => {
        const powerTypeData = powerModules.reduce((acc, val) => {
            acc[val] = modules[val]
            return acc
        }, {})
        onDataChanged('powerType', powerTypeData)
    }, [modules, onDataChanged])

    const powerChanged = (index, value) => {
        const newPowerState = [...powerState]
        newPowerState[index] = value
        setPowerState(newPowerState)
        onDataChanged('powers', newPowerState)
        updatePowerType()
    }

    const handleReset = useCallback(() => {
        setPowerState([])
        onDataChanged('powers', [])
        updatePowerType()
    }, [onDataChanged, updatePowerType])

    useEffect(() => {
        const {powerType = {}} = data
        const modulesChanged = powerModules.some(module => powerType[module] !== modules[module])
        if (modulesChanged) handleReset()
    }, [data, modules, handleReset])

    return (
        <Card width='auto' maxWidth={845}>
            <CardHeader title='Power Tracker'/>
            <CardContent className={classes.content}>
                <Grid container>
                    {powers.map((value, index) =>
                        <Power
                            key={index}
                            index={index}
                            power={value}
                            value={powerState[index]}
                            onChange={powerChanged}
                        />
                    )}
                </Grid>
            </CardContent>
            <CardActions>
                <Button color='secondary' onClick={handleReset}>Reset</Button>
            </CardActions>
        </Card>
    )
}

const powerModules = [
    'blackPyramid'
]

const useStyles = makeStyles({
    content: {
        padding: 8
    }
})

export default Powers
