import AdministrationPanel from "../../Components/Panel/Panel"
import Tiles from "../../Components/Tiles/Tiles"

export const Dashboard = () => {
    return <AdministrationPanel title='Visão Geral' tabID={0}>
        <Tiles />
    </AdministrationPanel>
}