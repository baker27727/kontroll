import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { getApartments } from "../redux/features/apartment_store"
import { Card } from "../components/Card"
import { DataTable } from "../components/DataTable"


export interface Apartment {
    id: number
    owner_name: string
    apartment_number: string
    email: string
    username: string
    password: string
    created_at: string
    residential_quarter_id: number
    residential_quarter: ResidentialQuarter
}

export interface ResidentialQuarter {
    id: number
    location: string
    policy: string
    code: string
    place_type: string
}

const Apartments = () => {
    const dispatch = useAppDispatch()
    const { apartments } = useAppSelector(state => state.apartmentSlice)
    // const navigate = useNavigate()

    useEffect(() => {
        dispatch(getApartments())
    }, [dispatch])
    return (
        <>
            <Card>
                <DataTable 
                    hoverable
                    data={apartments}
                    columns={[
                        { id: 'id', title: 'ID', key: 'id', sortable: true },
                        { id: 'owner_name', title: 'Owner Name', key: 'owner_name', sortable: true },
                        { id: 'apartment_number', title: 'Apartment Number', key: 'apartment_number', sortable: true },
                        { id: 'email', title: 'Email', key: 'email', sortable: true },
                        { id: 'username', title: 'Username', key: 'username', sortable: true },
                        { id: 'created_at', title: 'Created At', key: 'created_at', sortable: true },
                        { id: 'residential_quarter.location', title: 'Location', sortable: true, key: '', render(_, row) {
                            return row.residential_quarter.location
                        }, },
                    ]}

                    actions={
                        () => {
                            return (
                                // <div className="flex space-x-2">
                                //     <IconButton color='yellow' icon={BellIcon as IconType} size='sm' onClick={() => navigate(Routes.PAGES.APARTMENT_NOTIFICATIONS.replace(':id', row.id.toString()))}/>
                                // </div>

                                <div>

                                </div>
                            )
                        }
                    }
                />
            </Card>
        </>
    )
}

export default Apartments
