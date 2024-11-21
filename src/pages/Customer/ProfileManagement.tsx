import React from 'react'
import { Settings, Upload, CreditCard } from 'lucide-react'

const ProfileManagement = () => {
  return (
    <div>
        <div className="p-6 bg-white border rounded-lg shadow-sm">
            <h2 className="flex items-center mb-4 text-xl font-semibold">
              <Settings size={20} className="mr-2" /> Profile Management
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <img src="/api/placeholder/64/64" alt="Profile" className="w-16 h-16 rounded-full" />
                    <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                      <Upload size={16} className="mr-2" /> Upload New
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Email</label>
                  <input type="email" defaultValue="john.doe@example.com" className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Address</label>
                  <textarea className="w-full p-2 border rounded-lg" rows="3"></textarea>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Payment Methods</label>
                  <button className="flex items-center w-full p-2 text-left border rounded-lg">
                    <CreditCard size={16} className="mr-2" /> Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default ProfileManagement