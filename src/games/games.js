import Barenpark from './barenpark/Barenpark'
import FoodChainMagnate from './foodChainMagnate/FoodChainMagnate'
import Kemet from './kemet/Kemet'
import QuacksOfQuedlinberg from './quacksOfQuedlinberg/QuacksOfQuedlinberg'
import RollPlayer from './rollPlayer/RollPlayer'
import Unearth from './unearth/Unearth'

export default [
    {name: 'Bärenpark', path: '/barenpark', component: Barenpark},
    {name: 'Food Chain Magnate', path: '/foodChainMagnate', component: FoodChainMagnate},
    {name: 'Kemet', path: '/kemet', component: Kemet},
    {name: 'Quacks of Quedlinberg', path: '/quacksOfQuedlinberg', component: QuacksOfQuedlinberg},
    {name: 'Roll Player', path: '/rollPlayer', component: RollPlayer},
    {name: 'Unearth', path: '/unearth', component: Unearth}
]
