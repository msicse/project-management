import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, users, projects }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
    assigned_user_id: "",
    project_id: "",
    priority: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("tasks.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Tasks
          </h2>
          <Link
            href={route("tasks.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-700"
          >
            Create Task
          </Link>
        </div>
      }
    >
      <Head title="Tasks Create" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                <div>
                  <InputLabel htmlFor="task_image_path" value="Task Image" />
                  <TextInput
                    id="task_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="task_name" value="Task Name" />
                  <TextInput
                    id="task_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="task_description"
                    value="Task Description"
                  />
                  <TextareaInput
                    id="task_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="task_due_date" value="Task Due Date" />
                  <TextInput
                    id="task_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("due_date", e.target.value)}
                  />
                  <InputError message={errors.due_date} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="task_status" value="Task Status" />
                  <SelectInput
                    name="status"
                    id="task_status"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>
                  <InputError message={errors.status} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="task_priority" value="Task Priority" />
                  <SelectInput
                    name="priority"
                    id="task_priority"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("priority", e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectInput>
                  <InputError message={errors.priority} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="task_project_id" value="Task Project" />
                  <SelectInput
                    name="project_id"
                    id="task_project_id"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("project_id", e.target.value)}
                  >
                    <option value="">Select Project</option>
                    {projects.data.map((project) => (
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    ))}
                    ;
                  </SelectInput>
                  <InputError message={errors.project_id} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="task_assigned_user_id"
                    value="Assigned User"
                  />
                  <SelectInput
                    name="assigned_user_id"
                    id="task_assigned_user_id"
                    className="mt-1 block w-full"
                    onChange={(e) =>
                      setData("assigned_user_id", e.target.value)
                    }
                  >
                    <option value="">Select User</option>
                    {users.data.map((user) => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                    ;
                  </SelectInput>
                  <InputError
                    message={errors.assigned_user_id}
                    className="mt-2"
                  />
                </div>

                <div className="mt-4 text-right">
                  <Link
                    href={route("tasks.index")}
                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                  >
                    Cancel
                  </Link>
                  <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 mr-2">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}