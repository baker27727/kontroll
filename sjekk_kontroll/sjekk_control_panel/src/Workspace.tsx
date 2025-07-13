import React, { useState } from 'react'
import Alert from './components/Alert'
import Button from './components/Button'
import { Edit, Eye, Home, MoreHorizontal, Plus, Text, Trash } from 'lucide-react'
import { IconType } from 'react-icons'
import { Card } from './components/Card'
import CheckboxContainer from './components/CheckboxContainer'
import DropdownMenu from './components/DropdownMenu'
import Checkbox from './components/Checkbox'
import { BiWindow } from 'react-icons/bi'
import { ConfirmationModal } from './components/ConfirmationDialog'
import { DangerModal } from './components/DangerModal'
import Modal from './components/Modal'
import { Input } from './components/InputField'
import Sheet from './components/Sheet'
import ContextMenu from './components/ContextMenu'
import MailDetailsDemo from './UncategorizedProjectsFiles/MailDetails'
import AnalyticsCardDemo from './UncategorizedProjectsFiles/AnalyticsCard'
import DashboardComponents from './UncategorizedProjectsFiles/DashboardComponents'
import App from './components/PatternWrapper'
import UiDemo from './UncategorizedProjectsFiles/DemoComponent'
import Ui2Demo from './UncategorizedProjectsFiles/Demo'
import Snippet from './components/Snippet'
import EnhancedImageViewerDemo from './UncategorizedProjectsFiles/ImageControll'
import SkeletonDemo from './components/SkeletonLoaders'
import CarouselDemo from './components/Carousel'
import TimelineDemo from './components/Timeline'
import WatermarkDemo from './components/Watermark'
import SegmentedControlDemo from './components/Segment'
import Accordion from './components/Accordion'
import TimelineDemo2 from './UncategorizedProjectsFiles/TimeLineDemo'
import ImageGrid from './UncategorizedProjectsFiles/ImageGrid'

interface SectionHeaderProps {
    title: string
    className?: string
    description?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, className }) => {
  return (
    <div className={`mb-4 border px-2 py-2 bg-slate-700 rounded-sm ${className}`}>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  )
}


const Workspace = () => {
	const [isPrimaryCheckboxOpen, setIsPrimaryCheckboxOpen] = useState(false)
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
	const [isDangerModalOpen, setIsDangerModalOpen] = useState(false)
	const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)
	const [isFormModalOpen, setIsFormModalOpen] = useState(false)
	const [isSheetOpen, setIsSheetOpen] = useState(false)
  return (
    <>
      <section className='mb-4'>
        <SectionHeader title="Alerts" className='mb-2' />
        <Alert type="info" title="Info" onClose={() => {}} className='mb-4' />
        <Alert type="info" title="Info with children" onClose={() => {}} className='mb-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero assumenda perspiciatis consequatur ipsum rem tempore minus temporibus commodi! Sed deleniti quos ab nam? Eveniet, animi quo. Aut cupiditate odit obcaecati.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam velit, maiores et magni vel quod illo? Dignissimos expedita error minima voluptas amet, veritatis possimus incidunt, ullam iure molestiae corrupti accusantium!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dicta ea sunt cumque molestiae maxime possimus. Dolores eius, explicabo optio assumenda nam sint dignissimos necessitatibus. Laborum, reiciendis. Sequi, suscipit error.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dicta ea sunt cumque molestiae maxime possimus. Dolores eius, explicabo optio assumenda nam sint dignissimos necessitatibus. Laborum, reiciendis. Sequi, suscipit error.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dicta ea sunt cumque molestiae maxime possimus. Dolores eius, explicabo optio assumenda nam sint dignissimos necessitatibus. Laborum, reiciendis. Sequi, suscipit error.
        </Alert>

        <Alert type="success" title="Success" onClose={() => {}} className='mb-4' />
        <Alert type="warning" title="Warning" onClose={() => {}} className='mb-4' />
        <Alert type="error" title="Error" onClose={() => {}} />
      </section>

      <section className='mb-4'>
        <SectionHeader title="Buttons" className='mb-2' />
        <div className='flex items-center mb-4'>
            <Button className='mr-2'>Normal</Button>
            <Button className='mr-2' rightIcon={Home as IconType}>With Right Icon</Button>
            <Button className='mr-2' leftIcon={Home as IconType}>With Left Icon</Button>
            <Button className='mr-2' isLoading leftIcon={Home as IconType}>Loading</Button>
            <Button className='mr-2' variant='ghost' leftIcon={Home as IconType}>Ghost</Button>
            <Button className='mr-2' variant='ghost'>Ghost</Button>
            <Button className='mr-2' variant='link'>Link</Button>
            <Button className='mr-2' variant='text'>Text</Button>
            <Button className='mr-2' variant='outline'>Outline</Button>
            <Button className='mr-2' variant='link' leftIcon={Home as IconType} disabled>Disabled</Button>

        </div>

        <div>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType}>Info Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='red'>Red Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='blue'>Blue Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='green'>Green Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='yellow'>Yellow Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='purple'>Purple Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='pink'>Pink Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='indigo'>Indigo Color</Button>
            <Button className='mr-2' variant='outline' leftIcon={Home as IconType} color='gray'>Gray Color</Button>
        </div>
      </section>


      <section className='mb-4'>
        <SectionHeader title="Cards" className='mb-2' />

        <div>
            <Card className='mb-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolores iure vitae porro illo dolorem accusantium amet, nemo nam voluptates repudiandae, laboriosam hic delectus, ipsa aliquid labore corporis cumque! Vel.
            </Card>

            <Card title='Card Title' className='mb-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolores iure vitae porro illo dolorem accusantium amet, nemo nam voluptates repudiandae, laboriosam hic delectus, ipsa aliquid labore corporis cumque! Vel.
            </Card>

            <Card title='Card Title' className='mb-4' headerAction={<Button variant='outline' rightIcon={Plus as IconType}>Action</Button>}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus perspiciatis fugiat numquam tenetur, recusandae quidem error velit soluta quo laborum vero sit hic molestias sed officia illum nesciunt deleniti sint!
            </Card>
        </div>
      </section>

      <section className='mb-4'>
        <SectionHeader title="Checkboxes Container" className='mb-2' />
        <div className='flex space-x-2 w-96'>
            <CheckboxContainer>
							Option 1
						</CheckboxContainer>
            <CheckboxContainer>
							Option 2
						</CheckboxContainer>
            <CheckboxContainer>
							Option 3
						</CheckboxContainer>
            <CheckboxContainer>
							Option 4
						</CheckboxContainer>
        </div>
      </section>

      <section className='mb-4'>
        <SectionHeader title="Checkboxes Container With custom design" className='mb-2' />
        <div className='flex space-x-2 w-96'>
          <CheckboxContainer
            className='flex items-center rounded shadow-sm border border-gray-300'
          >
            <div className='flex items-center w-40'>
              <img src="/src/assets/react.svg" alt="" className='h-6 w-6 mr-2' />
              <div className='flex flex-col'>
                <span className='text-sm font-semibold'>Option 1</span>
                <p className='text-xs text-gray-500'>Description</p>
              </div>
            </div>
          </CheckboxContainer>
        </div>
      </section>

      <section className='mb-4 flex flex-col space-y-2'>
        <SectionHeader title="Checkboxes" className='mb-2' />
        <Checkbox label={'Primary'} checked={isPrimaryCheckboxOpen} onChange={() => setIsPrimaryCheckboxOpen(!isPrimaryCheckboxOpen)} />
        <Checkbox label={'Checked'} checked={true} onChange={() => {}} />

				<Checkbox label={'Secondary'} color='secondary' checked={true} onChange={() => {}}/>
				<Checkbox label={'Warning'} color='warning' checked={true} onChange={() => {}}/>
				<Checkbox label={'Error'} color='danger' checked={true} onChange={() => {}}/>
				<Checkbox label={'Success'} color='success' checked={true} onChange={() => {}}/>
				<Checkbox label={'Info'} color='info' checked={true} onChange={() => {}}/>
				<Checkbox label={'Dark'} color='dark' checked={true} onChange={() => {}}/>
      </section>

      <section className='mb-4'>
        <SectionHeader title="Dropdowns" className='mb-2' />
				<p>Without Icons</p>
        <DropdownMenu
            trigger= {
              <MoreHorizontal />
            }
          items={[
            { label: 'Option 1', onClick: () => console.log('Option 1 clicked') },
            { label: 'Option 2', onClick: () => console.log('Option 2 clicked') },
            { label: 'Option 3', onClick: () => console.log('Option 3 clicked') },
          ]}
        />

				<p>With Icons</p>
        <DropdownMenu
            trigger= {
              <MoreHorizontal />
            }
          items={[
            { label: 'See Details', onClick: () => console.log('Option 3 clicked'), icon: <Eye className='w-4 h-4'/>	},
            { label: 'Edit', onClick: () => console.log('Option 1 clicked'), icon: <Edit className='w-4 h-4'/> 	},
            { label: 'Delete', onClick: () => console.log('Option 2 clicked'), icon: <Trash className='w-4 h-4'/>, hoverColor: 'red'	},
          ]}
        />
      </section>

			<section className='mb-4'>
				<SectionHeader title="Modal" className='mb-2' />
				<div className='flex space-x-2'>
					<Button leftIcon={BiWindow} onClick={() => setIsConfirmationModalOpen(true)}>Show Confirmation Modal</Button>
					<Button leftIcon={BiWindow} onClick={() => setIsDangerModalOpen(true)}>Show Danger Modal</Button>
					<Button leftIcon={BiWindow} onClick={() => setIsFormModalOpen(true)}>Show Form Modal</Button>
					<Button leftIcon={BiWindow} onClick={() => setIsCustomModalOpen(true)}>Show Custom Modal</Button>
					<Button leftIcon={BiWindow} onClick={() => setIsSheetOpen(true)}>Show Sheet Modal</Button>

					<ConfirmationModal 
						title='Are you sure you want to delete this item?'
						content='This action is permanent and cannot be undone.'
						onAccept={() => console.log('Confirm')}
						isOpen={isConfirmationModalOpen}
						onCancel={() => setIsConfirmationModalOpen(false)}
						onClose={() => setIsConfirmationModalOpen(false)}
					/>

					<DangerModal 
						title='Are you sure you want to delete this item?'
						content='This action is permanent and cannot be undone.'
						onAccept={() => console.log('Confirm')}
						isOpen={isDangerModalOpen}
						onCancel={() => setIsDangerModalOpen(false)}
						onClose={() => setIsDangerModalOpen(false)}
					/>

					<Modal title='Form Modal' isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
						<>
							<Input 
								icon={Text as IconType}
								placeholder='Enter your name'
								helperText='Enter name'
							/>

							<div className='flex justify-end space-x-2'>
								<Button onClick={() => setIsFormModalOpen(false)} variant='outline' color='gray'>Cancel</Button>
								<Button onClick={() => setIsFormModalOpen(false)} color='green'>Submit</Button>
							</div>
						</>
					</Modal>

					<Modal isOpen={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)} showCloseButton={false}>
						<div className=''>
							<div className=''>
								<h2 className='text-2xl font-semibold'>Custom Modal</h2>
							</div>
							<div className=''>
								<p className='text-gray-600 text-sm'>
									You can customize the modal as you want, add your own content, style it as you prefer.
								</p>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore nostrum explicabo corrupti alias harum vel autem voluptatem qui dignissimos architecto perferendis, id magni porro saepe sint eos totam unde. Ut!
								</p>
								<div className='flex items-center justify-end'>
									<Button color='green' className='mr-2' onClick={() => setIsCustomModalOpen(false)}>Close</Button>
									<Button color='blue'>Save Changes</Button>
								</div>
							</div>
						</div>
					</Modal>

					<Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
						<div className='p-6 space-y-4'>
							<h2 className='text-2xl font-semibold'>Side Sheet</h2>
							<p className='text-gray-600 text-sm'>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, quibusdam
								asperiores ea, quos, quidem et eaque consequuntur doloremque repellendus
								unde! Eaque, quia!
							</p>
							<div className='flex items-center space-x-2'>
								<Button color='green' className='mr-2'> Save Changes</Button>
								<Button color='gray' variant='outline' onClick={() => setIsSheetOpen(false)}>Cancel</Button>
							</div>
						</div>
					</Sheet>
				</div>
			</section>

			<section className='mb-4'>
				<SectionHeader title="Context Menu" className='mb-2' />

				<ContextMenu
					menuItems={[
						{
							label: 'Edit',
							icon: <Edit className='w-4 h-4'/>,
							onClick: () => console.log('Edit'),
						},
						{
							label: 'Delete',
							icon: <Trash className='w-4 h-4' />,
							onClick: () => console.log('Delete'),
						},
					]}
				>
					<Button leftIcon={BiWindow}>Show Context Menu</Button>
				</ContextMenu>
			</section>

			<section className='mb-4'>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<MailDetailsDemo />
			</section>

			<section className='mb-4'>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<AnalyticsCardDemo />
			</section>

			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<DashboardComponents />
			</section>

			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<App />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<UiDemo />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<Ui2Demo />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<Snippet commands={[
					'npm install @chakra-ui/react',
					'npm install @chakra-ui/icons',
				]} />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<EnhancedImageViewerDemo />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<SkeletonDemo />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<CarouselDemo 
					autoPlay={false}
					items={[
						{
							image: "/src/assets/block.jpg",
							caption: "Image 1",
						},
						{
							image: "/src/assets/block.jpg",
							caption: "Image 2",
						}
					]}
				/>
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<TimelineDemo
					events={[
						{
							title: 'Event 1',
							date: '2022-01-01',
							description: 'Description 1',
							icon: <Edit className='w-4 h-4'/>,
						},
						{
							title: 'Event 1',
							date: '2022-01-01',
							description: 'Description 1',
							icon: <Edit className='w-4 h-4'/>,
						},
						{
							title: 'Event 1',
							date: '2022-01-01',
							description: 'Description 1',
							icon: <Edit className='w-4 h-4'/>,
						},
					]}
				/>
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<WatermarkDemo />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<SegmentedControlDemo />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<Accordion 
					title='Accordion'
				>
					<div className='w-64 h-64 bg-gray-100 rounded-lg'></div>
				</Accordion>
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<TimelineDemo2 />
			</section>
			<section>
				<SectionHeader title="Dropdown Menu" className='mb-2' />
				<ImageGrid />
			</section>
    </>
  )
}

export default Workspace