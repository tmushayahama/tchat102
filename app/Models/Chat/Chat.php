<?php

namespace App\Models\Chat;

use Illuminate\Database\Eloquent\Model;
use Request;
use DB;
use JWTAuth;

class Chat extends Model {

 /**
  * The database table used by the model.
  *
  * @var string
  */
 protected $table = 'gb_chat';

 public function creator() {
  return $this->belongsTo('App\Models\User\User', 'creator_id');
 }

 public function icon() {
  return $this->belongsTo('App\Models\Icon\Icon', 'icon_id');
 }

 public function level() {
  return $this->belongsTo('App\Models\Level\Level', 'level_id');
 }

 /**
  * The attributes that are mass assignable.
  *
  * @var array
  */
 protected $fillable = ['title', 'description', 'level_id'];

 public static function getChatsAll() {
  $chats = Chat::orderBy('id', 'desc')
          ->with('creator')
          ->with('icon')
          ->with('level')
          ->take(50)
          ->get();
  return $chats;
 }

 public static function getChatsMine() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $chats = Chat::orderBy('id', 'desc')
          ->where('creator_id', $userId)
          ->with('icon')
          ->with('creator')
          ->with('level')
          ->take(10)
          ->get();
  return $chats;
 }

 public static function getChat($id) {
  $chat = Chat::with('creator')
          ->with('icon')
          ->with('level')
          ->find($id);
  //$user = JWTAuth::parseToken()->toUser();
  //$userId = $user->id;
  return $chat; //$chat;
 }

 public static function createChat() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $title = Request::get("title");
  $description = Request::get("description");
  $levelId = Request::get("level");

  $chat = new Chat;
  $chat->creator_id = $userId;
  $chat->title = $title;
  $chat->description = $description;
  $chat->level_id = $levelId;

  DB::beginTransaction();
  try {
   $chat->save();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $chat;
 }

 public static function editChat() {
  $user = JWTAuth::parseToken()->toUser();
  $userId = $user->id;
  $chatId = Request::get("chatId");
  $title = Request::get("title");
  $description = Request::get("description");
  $chat = Chat::find($chatId);
  $chat->title = $title;
  $chat->description = $description;

  DB::beginTransaction();
  try {
   $chat->push();
  } catch (\Exception $e) {
   //failed logic here
   DB::rollback();
   throw $e;
  }
  DB::commit();
  return $chat;
 }

}
