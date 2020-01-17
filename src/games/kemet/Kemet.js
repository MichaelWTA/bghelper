import React, {useCallback, useState} from 'react'
import Tabs from '../../shared/Tabs'
import Powers from './powers/Powers'
import ExpansionModules from './modules/ExpansionModules'
// import Setup from './setup/Setup'

function Kemet() {
    const [data = {}, setData] = useState(() => {
        try {
            const oldStorageData = localStorage.getItem(localStorageKey)
            // TODO: validate parsed data
            return JSON.parse(oldStorageData) || {}
        } catch (ex) {
            console.warn('Error loading local storage data: ', ex)
            localStorage.removeItem(localStorageKey)
        }
        return {}
    })

    const [modules, setModules] = useState(data.modules || {})

    const handleDataUpdate = useCallback((prop, value) => {
        const newData = {...data, [prop]: value}
        setData(newData)
        const newValue = JSON.stringify(newData)
        localStorage.setItem(localStorageKey, newValue)
    }, [data])

    const handleModulesChanged = useCallback(newModules => {
        setModules(newModules)
        handleDataUpdate('modules', newModules)
    }, [handleDataUpdate])

    const tabs = [
        {
            label: 'Powers',
            alwaysRender: false,
            content: <Powers
                data={data}
                onDataChanged={handleDataUpdate}
                modules={modules}
            />
        },
        {
            label: 'Modules',
            content: <ExpansionModules
                data={data}
                onDataChanged={handleDataUpdate}
                onDataUpdate={handleDataUpdate}
                modules={modules}
                onModulesChanged={handleModulesChanged}
            />
        }
    ]
    return <Tabs title={'Kemet'} tabs={tabs}/>
}

const localStorageKey = 'kemetData'

export default Kemet
