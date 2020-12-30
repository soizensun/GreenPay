import NavBar from '../components/NavBar'

export default function MainLayout(props) {
    return (
        <div>
            <NavBar/>
            {props.children}
        </div>
    )
}
