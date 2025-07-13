import { Plus, Trash2, List } from "lucide-react";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/Button";
import { DangerModal } from "../../../components/DangerModal";
import { Input } from "../../../components/InputField";
import Modal from "../../../components/Modal";
import { TextArea } from "../../../components/TextArea";
import Button from "../../../components/Button";
import { IconType } from "react-icons";
import { DataTable } from "../../../components/DataTable";
import IconButton from "../../../components/IconButton";
import Tooltip from "../../../components/Tooltip";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { createNormalPlace, getNormalPlaces } from "../../../redux/features/normal_place_store";
import { unwrapResult } from "@reduxjs/toolkit";
import { deletePlace } from "../../../redux/features/PlaceSlice";
import { showNotification } from "../../../redux/features/notification_store";
import { getPartners } from "../../../redux/features/PartnerSlice";
import Select from "../../../components/Select";
import NormalPlace from "../../../interfaces/NormalPlace";
import { Link } from "react-router-dom";
import Routes from "../../../constants/routes";

const PublicPlaces = () => {
    const [isAddProfileModalOpen, setIsAddProfileModalOpen] = useState(false);
    const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
    const [isDeleteProfileModalOpen, setIsDeleteProfileModalOpen] = useState(false);
    const [isDeletePlaceModalOpen, setIsDeletePlaceModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [policy, setPolicy] = useState('');
    const [partner_id, setPartner_id] = useState(null);

    const [selectedPlace, setSelectedPlace] = useState<NormalPlace | null>(null);


    const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getNormalPlaces())
    dispatch(getPartners())
  }, [dispatch])

  const {normal_places} = useAppSelector(state => state.normal_place_store)
  const {partners} = useAppSelector(state => state.partnerProvider)

    const openDeleteProfileModal = () => {
      setIsDeleteProfileModalOpen(true);
    }

      const filteredPlaces = (places) => places.filter(place =>
        place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.code.includes(searchTerm)
      );

      const openDeleteModal = (place) => {
        setSelectedPlace(place);
        setIsDeletePlaceModalOpen(true);
      };
   
      const handleDeletePlace = async () => {
        await dispatch(deletePlace(selectedPlace.place.id))
          .then(unwrapResult)
          .then(() => {
            dispatch(
              showNotification({
                type: 'success',
                message: 'Place deleted successfully'
              })
            )

            setIsDeletePlaceModalOpen(false);
            dispatch(getNormalPlaces());
          })
          .catch((err: Error) => {
            dispatch(
              showNotification({
                type: 'error',
                message: err.message
              })
            )
          });
      };

      const handleCreatePlace = async () => {
        
        await dispatch(
          createNormalPlace({
            location: name,
            code: code,
            policy: policy,
            partner_id: partner_id ?? undefined
          })
        )
          .then(unwrapResult)
          .then(() => {
            dispatch(
              showNotification({
                type: 'success',
                message: 'Place created successfully'
              })
            )

            dispatch(getNormalPlaces());
            setIsAddPlaceModalOpen(false);

            dispatch(getNormalPlaces());

          }).then(() => {
            dispatch(
              showNotification({
                type: 'success',
                message: 'Place created successfully'
              })
            )
          }).catch((err: Error) => {
            dispatch(
              showNotification({
                type: 'error',
                message: err.message
              })
            )
          })
      };

      // const navigate = useNavigate();

    return (
      <>
                  <div className="flex mb-4">
              <input
                type="text"
                placeholder="Search Normal places"
                className="flex-grow px-4 focus:ring-1 border rounded focus:outline-none "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={() => setIsAddPlaceModalOpen(true)} size="sm" leftIcon={Plus as IconType} className="bg-blue-500 ml-2 text-white px-6 py-1.5 rounded hover:bg-blue-600 transition duration-200">
                CREATE
              </Button>
            </div>
            <DataTable 
              columns={[
                { id: 'name', title: 'Lokasjon', key: 'location', sortable: true },
                { id: 'policy', title: 'Politikk', key: 'policy', sortable: true },
                { id: 'code', title: 'Kode', key: 'code', sortable: true },
                { id: 'partner', title: 'Partner', key: ['partner', 'name'], sortable: true, render: (row) => row as string ?? (<p className='text-red-700 font-semibold'>N/A</p>) },
              ]}
              data={filteredPlaces(normal_places)}
              actions={
                (row: NormalPlace) => (
                  <div className="flex space-x-2">
                    <Tooltip content="See place profiles">
                      <Link to={Routes.PAGES.PUBLIC_PLACES_DASHBOARDS.replace(':id', row.id.toString())}>
                        <IconButton icon={List as IconType} onClick={() => openDeleteProfileModal()} color="blue"/>
                      </Link>
                    </Tooltip>
                    {/* <IconButton color='yellow' icon={BellIcon as IconType} size='sm' onClick={() => navigate(Routes.PAGES.PUBLIC_PLACE_NOTIFICATIONS.replace(':id', row.id.toString()))}/> */}


                    <IconButton icon={Trash2 as IconType} onClick={() => openDeleteModal(row)} color="red"/>
                  </div>
                )
              }
            />

      <Modal isOpen={isAddPlaceModalOpen} onClose={() => setIsAddPlaceModalOpen(false)} title='Add New Place'>
        <Input placeholder='Name' helperText='Enter pace name' value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder='Code' helperText='Enter place code' value={code} onChange={(e) => setCode(e.target.value)} />
        <Select 
        placeholder="Select Partner (Optional)*"
        className="w-full mb-4"
          options={
            [
              {label: 'None', value: null},
              ...partners.map((partner) => ({label: partner.name, value: partner.id})),
            ]
          }
          onChange={(e) => setPartner_id(e)}
        />
        <TextArea placeholder='Policy' helperText='Enter place policy' rows={6} value={policy} onChange={(e) => setPolicy(e.target.value)}/>
        

        <div className="flex justify-end space-x-2">
        <CustomButton variant='outline' onClick={() => setIsAddPlaceModalOpen(false)} color="green">
          Cancel
        </CustomButton>

        <CustomButton onClick={handleCreatePlace} color="green">
          Add
        </CustomButton>
        </div>
      </Modal>

      <Modal isOpen={isAddProfileModalOpen} onClose={() => setIsAddProfileModalOpen(false)} title='Add New Profile'>
        <Input placeholder='Profile Name' helperText='Enter the profile name' />
        <Input placeholder='Type' helperText='Enter type' />
        <Input placeholder='Access username' helperText='Enter access username' />
        <Input placeholder='Access code' helperText='Enter access code' />
        <Input placeholder='Free parking Hours' type='number' helperText='Enter free parking hours' />

        <div className="flex justify-end space-x-2">
        <CustomButton variant='outline' onClick={() => setIsAddProfileModalOpen(false)} color="green">
          Cancel
        </CustomButton>

        <CustomButton onClick={() => setIsAddProfileModalOpen(false)} color="green">
          Add
        </CustomButton>
        </div>
      </Modal>

      <DangerModal 
        isOpen={isDeleteProfileModalOpen} 
        onClose={() => setIsDeleteProfileModalOpen(false)} 
        title='Delete Profile'
        onAccept={() => setIsDeleteProfileModalOpen(false)}
        onCancel={() => setIsDeleteProfileModalOpen(false)}
        content='Are you sure you want to delete this profile?'
      />

      <DangerModal 
        isOpen={isDeletePlaceModalOpen} 
        onClose={() => setIsDeletePlaceModalOpen(false)} 
        title='Delete Place'
        onAccept={handleDeletePlace}
        onCancel={() => setIsDeletePlaceModalOpen(false)}
        content='Are you sure you want to delete this place?'
      />
      </>
    )
};
  

export default PublicPlaces