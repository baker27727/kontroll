// import { useState } from 'react';
// import { Save, X, Upload, Eye, EyeOff, RefreshCw } from 'lucide-react';
// import CustomButton from '../components/Button';
// import { Input } from '../components/InputField';
// import { TextArea } from '../components/TextArea';
// import Switch from '../components/Switch';

// const EditProfile = () => {
//   const [profile, setProfile] = useState({
//     name: 'Sentrum Parkering',
//     policy: 'Maks 3 timer parkering',
//     code: 'SENT2023',
//     slug: 'sentrum-parkering',
//     image: '/placeholder.svg?height=200&width=200',
//     isActive: true,
//   });

//   const [showCode, setShowCode] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfile(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfile(prev => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const generateRandomCode = () => {
//     const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//     setProfile(prev => ({ ...prev, code: newCode }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">Rediger profil</h1>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2 space-y-6">
//               <Input
//                 label="Navn"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleChange}
//                 placeholder="Stedets navn"
//               />
//               <TextArea
//                 label="Policy"
//                 name="policy"
//                 value={profile.policy}
//                 onChange={handleChange}
//                 placeholder="Beskriv stedets parkeringspolicy"
//                 rows={4}
//               />
//               <div className="relative">
//                 <Input
//                   label="Kode"
//                   name="code"
//                   value={profile.code}
//                   onChange={handleChange}
//                   placeholder="Unik stedskode"
//                   type={showCode ? "text" : "password"}
//                 />
//                 <button
//                   className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
//                   onClick={() => setShowCode(!showCode)}
//                 >
//                   {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//                 <button
//                   className="absolute right-10 top-8 text-gray-500 hover:text-gray-700"
//                   onClick={generateRandomCode}
//                 >
//                   <RefreshCw size={20} />
//                 </button>
//               </div>
//               <Input
//                 label="Slug"
//                 name="slug"
//                 value={profile.slug}
//                 onChange={handleChange}
//                 placeholder="URL-vennlig navn"
//               />
//               <div className="flex items-center space-x-2">
//                 <Switch
//                 label='Aktiv profil'
//                   onChange={(checked) => setProfile(prev => ({ ...prev, isActive: checked }))}
//                 />
//                 <span className="text-sm font-medium text-gray-700">Aktiv profil</span>
//               </div>
//             </div>
//             <div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Profilbilde
//                 </label>
//                 <div
//                   className={`border-2 border-dashed rounded-lg p-4 text-center ${
//                     isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                   }`}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                 >
//                   <img
//                     src={profile.image}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
//                   />
//                   <p className="text-sm text-gray-500 mb-2">
//                     Dra og slipp bilde her, eller
//                   </p>
//                   <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
//                     <Upload className="w-4 h-4 mr-2" />
//                     Velg fil
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-8">
//             <CustomButton
//               color="gray"
//               variant="outline"
//               className="flex items-center"
//               onClick={() => {/* Navigate back */}}
//             >
//               <X className="w-4 h-4 mr-2" />
//               Avbryt
//             </CustomButton>
//             <CustomButton
//               color="green"
//               className="flex items-center"
//               onClick={() => {/* Save changes */}}
//             >
//               <Save className="w-4 h-4 mr-2" />
//               Lagre endringer
//             </CustomButton>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default EditProfile;


const EditPlaceProfile = () => {
  return (
    <div>EditPlaceProfile</div>
  )
}

export default EditPlaceProfile