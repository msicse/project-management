import Pagination from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function TasksTable({
  tasks,
  queryParams = null,
  hideProjectColumn = false,
}) {
  //Must be an object
  queryParams = queryParams || {};

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("tasks.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };

  const shortChanged = (name) => {
    if (name === queryParams.short_field) {
      if (queryParams.short_direction === "asc") {
        queryParams.short_direction = "desc";
      } else {
        queryParams.short_direction = "asc";
      }
    } else {
      queryParams.short_field = name;
      queryParams.short_direction = "asc";
    }

    router.get(route("tasks.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Are you sure to delete?")) {
      return;
    }
    router.delete(route("tasks.destroy", task.id));
  };

  return (
    <>
      <div className="overflow-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                short_field={queryParams.short_field}
                short_direction={queryParams.short_direction}
                shortChanged={shortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3 ">Image</th>

              <TableHeading
                name="name"
                short_field={queryParams.short_field}
                short_direction={queryParams.short_direction}
                shortChanged={shortChanged}
              >
                Name
              </TableHeading>

              {!hideProjectColumn && (
                <th className="px-3 py-3 ">Project Name</th>
              )}

              <TableHeading
                name="status"
                short_field={queryParams.short_field}
                short_direction={queryParams.short_direction}
                shortChanged={shortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                short_field={queryParams.short_field}
                short_direction={queryParams.short_direction}
                shortChanged={shortChanged}
              >
                Created at
              </TableHeading>
              <TableHeading
                name="updated_at"
                short_field={queryParams.short_field}
                short_direction={queryParams.short_direction}
                shortChanged={shortChanged}
              >
                Updated At
              </TableHeading>
              <th className="px-3 py-3 ">Created By</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3 "></th>
              <th className="px-3 py-3 "></th>
              <th className="px-3 py-3 "></th>
              <th className="px-3 py-2 ">
                <TextInput
                  className="w-full"
                  placeholder="Task Name"
                  defaultValue={queryParams.name}
                  onBlur={(e) => searchFieldChange("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-3 ">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChange("status", e.target.value)}
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
            {tasks.data.map((task) => (
              <tr
                key={task.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <th className="px-3 py-2">{task.id}</th>
                <td className="px-3 py-2">
                  <img src={task.image_path} alt="" style={{ width: 60 }} />
                </td>
                <th className="px-3 py-2 text-gray-100  hover:underline">
                  <Link href={route("tasks.show", task.id)}>{task.name}</Link>
                </th>
                <td>{!hideProjectColumn && task.project.name}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2">
                  <Link
                    href={route("tasks.edit", task.id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => deleteTask(task)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination links={tasks.meta.links} />
      </div>
    </>
  );
}
