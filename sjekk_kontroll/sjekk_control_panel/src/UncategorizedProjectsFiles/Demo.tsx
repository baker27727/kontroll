import { Check, X, AlertTriangle, Info, Bell } from 'lucide-react';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import { List, ListItem } from '../components/List';
import ImageList from '../components/ImageList';
import { Grid, GridItem } from '../components/Grid';
import TreeView from '../components/TreeView';
import SpeedDial from '../components/SpeedDial';

export default function Ui2Demo() {
  return (
    <div className="max-w-8xl mx-auto p-6 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Avatar</h2>
        <div className="flex space-x-4">
          <Avatar src="/src/assets/block.jpg" alt="John Doe" size="sm" status="online" />
          <Avatar src="/src/assets/block.jpg" alt="Jane Smith" size="md" status="away" />
          <Avatar alt="Alice Johnson" size="lg" status="busy" />
          <Avatar src="/src/assets/block.jpg" alt="Bob Williams" size="xl" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Badge</h2>
        <div className="flex flex-wrap gap-2 space-x-8">
          <Badge count={5} maxCount={10} color='green' animate animationType='bounce'>
            <Bell />
          </Badge>
          <Badge count={5} maxCount={10} color='blue' animate>
            <Bell />
          </Badge>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">List</h2>
        <List>
          <ListItem icon={<Check className="text-green-500" />}>Task 1 completed</ListItem>
          <ListItem icon={<X className="text-red-500" />}>Task 2 failed</ListItem>
          <ListItem icon={<AlertTriangle className="text-yellow-500" />}>Task 3 pending</ListItem>
          <ListItem icon={<Info className="text-blue-500" />}>Task 4 in progress</ListItem>
        </List>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Speed Dial</h2>
        <p>Check the bottom right corner of the page for the Speed Dial component.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Image List</h2>
        <ImageList
          images={[
            { src: "/src/assets/block.jpg", alt: "Image 1", title: "Beautiful Landscape" },
            { src: "/src/assets/block.jpg", alt: "Image 2", title: "City Skyline" },
            { src: "/src/assets/block.jpg", alt: "Image 3", title: "Mountain View" },
            { src: "/src/assets/block.jpg", alt: "Image 4", title: "Serene Beach" },
            { src: "/src/assets/block.jpg", alt: "Image 5", title: "Forest Trail" },
            { src: "/src/assets/block.jpg", alt: "Image 6", title: "Desert Sunset" },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Grid System</h2>
        <Grid cols={12} gap="sm">
          <GridItem colSpan={6} colSpanMd={6} colSpanLg={4}>
            <div className="bg-blue-100 p-4 rounded">Span 12 (md:6, lg:4)</div>
          </GridItem>
          <GridItem colSpan={6} colSpanMd={6} colSpanLg={4}>
            <div className="bg-green-100 p-4 rounded">Span 12 (md:6, lg:4)</div>
          </GridItem>
          <GridItem colSpan={12} colSpanMd={12} colSpanLg={4}>
            <div className="bg-yellow-100 p-4 rounded">Span 12 (md:12, lg:4)</div>
          </GridItem>
        </Grid>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">TreeView</h2>
        <TreeView
          data={[
            {
              id: '1',
              label: 'Root',
              children: [
                {
                  id: '2',
                  label: 'Child 1',
                  children: [
                    { id: '5', label: 'Grandchild 1' },
                    { id: '6', label: 'Grandchild 2' },
                  ],
                },
                {
                  id: '3',
                  label: 'Child 2',
                  children: [
                    { id: '7', label: 'Grandchild 3' },
                    { id: '8', label: 'Grandchild 4' },
                  ],
                },
                { id: '4', label: 'Child 3' },
              ],
            },
          ]}
        />
      </section>

      <SpeedDial
        actions={[
          { icon: <Check />, label: 'Approve', onClick: () => console.log('Approved') },
          { icon: <X />, label: 'Reject', onClick: () => console.log('Rejected') },
          { icon: <AlertTriangle />, label: 'Flag', onClick: () => console.log('Flagged') },
        ]}
      />
    </div>
  );
}