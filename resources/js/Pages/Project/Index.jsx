import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";

export default function Index({ auth, projects, queryParams }) {
  //Must be an object
  queryParams = queryParams || {}


  const searchFieldChange = (name, value) => {
    if(value){
      queryParams[name] = value
    }else{
      delete queryParams[name]
    }


    router.get(route('projects.index'), queryParams);
  }


  const onKeyPress = (name, e) => {
    if(e.key !== "Enter") return;

    searchFieldChange(name, e.target.value)
  }

  const shortChanged = (name) => {
    if(name === queryParams.short_field){
      if(queryParams.short_direction === 'asc'){
        queryParams.short_direction = 'desc';
      }else{
        queryParams.short_direction = 'asc';
      }
    }else {
      queryParams.short_field = name;
      queryParams.short_direction = 'asc';
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <pre>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th onClick={(e) => shortChanged("id")} className="px-3 py-2 ">ID</th>
                      <th className="px-3 py-3 ">Image</th>
                      <th onClick={(e) => shortChanged("name")} className="px-3 py-3 ">Name</th>

                      <th onClick={(e) => shortChanged("status")} className="px-3 py-3 ">Status</th>
                      <th onClick={(e) => shortChanged("created_at")} className="px-3 py-3 ">Create Date</th>
                      <th onClick={(e) => shortChanged("due_date")} className="px-3 py-3 ">Due Date</th>
                      <th className="px-3 py-3 ">Created By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-2 ">
                        <TextInput
                          className="w-full"
                          placeholder="Project Name"
                          defaultValue = {queryParams.name}
                          onBlur={e => searchFieldChange('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)}
                        />
                      </th>
                      <th className="px-3 py-3 ">
                        <SelectInput
                        className="w-full"
                        defaultValue = {queryParams.status}
                        onChange={e => searchFieldChange('status', e.target.value)}
                        >

                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">Inprogress</option>
                        <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 "></th>
                      <th className="px-3 py-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                        <th className="px-3 py-2">{project.id}</th>
                        <td className="px-3 py-2">
                          <img
                            src={project.image_path}
                            alt=""
                            style={{ width: 60 }}
                          />
                        </td>
                        <td className="px-3 py-2">{project.name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-2">{project.createdBy.name}</td>
                        <td className="px-3 py-2">
                          <Link
                            href={route("projects.edit", project.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("projects.destroy", project.id)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination links={projects.meta.links} />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
