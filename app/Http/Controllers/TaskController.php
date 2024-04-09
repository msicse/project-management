<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserCrudResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $shortField = request("short_field", 'created_at');
        $shortDirection = request("short_direction", 'desc');

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $tasks = $query->orderBy($shortField, $shortDirection)->paginate(10)->onEachSide(1);
        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            "projects" => ProjectResource::collection($projects),
            "users" => UserCrudResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::user()->id;
        $data['updated_by'] = Auth::user()->id;
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $task = Task::create($data);

        return to_route("tasks.index")->with("success", ("Task is created"));
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {

        return inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            "task" => new TaskResource($task),
            "projects" => ProjectResource::collection($projects),
            "users" => UserCrudResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::user()->id;

        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        if ($image) {
            $data['image_path'] = $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route("tasks.index")->with("success", ("Task \"$task->name\" is updated"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if ($task->image_path) {
            Storage::disk("public")->deleteDirectory(dirname($task->image_path));
        }

        return to_route('tasks.index')->with('success', ("Task \"$name\" was deleted"));
    }


    public function myTasks()
    {
        $user = auth()->user();

        $query = Task::query()->where('assigned_user_id', $user->id);

        $shortField = request("short_field", 'created_at');
        $shortDirection = request("short_direction", 'desc');

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $tasks = $query->orderBy($shortField, $shortDirection)->paginate(10)->onEachSide(1);
        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
