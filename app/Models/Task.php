<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class Task extends Model
{
    use HasFactory;

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function assignedUser(){
        return $this->belongsTo(User::class, "assigned_user_id");
    }


    public function createdBy(){
        return $this->belongsTo(User::class, "created_by");
    }

    public function updatedBy(){
        return $this->belongsTo(User::class, "updated_by");
    }
}
