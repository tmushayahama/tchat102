<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

Route::get('/', function () {
 return view('index');
});

Route::group(['prefix' => 'api'], function() {
 Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
 Route::post('authenticate', 'AuthenticateController@authenticate');
 Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
 Route::get('chats/all', 'Skill\SkillController@getSkillsAll');
 Route::get('chatss/mine', 'Skill\SkillController@getSkillsMine');
 Route::get('chats/{chatsId}/comments', 'Skill\SkillController@getSkillComments');
 Route::get('chats/{chatsId}/comment/{commentId}', 'Skill\SkillController@getSkillComment');
 Route::get('chats/{chatsId}/todos', 'Skill\SkillController@getSkillTodos');
 Route::get('chats/{chatsId}/todo/{todoId}', 'Skill\SkillController@getSkillTodo');
 Route::get('chats/{chatsId}/notes', 'Skill\SkillController@getSkillNotes');
 Route::get('chats/{chatsId}/note/{noteId}', 'Skill\SkillController@getSkillNote');
 Route::get('chats/{chatsId}/timelines', 'Skill\SkillController@getSkillTimelines');
 Route::get('chats/{chatsId}/timeline/{timelineId}', 'Skill\SkillController@getSkillTimeline');
 Route::get('chats/{chatsId}/weblinks', 'Skill\SkillController@getSkillWeblinks');
 Route::get('chats/{chatsId}/weblink/{weblinkId}', 'Skill\SkillController@getSkillWeblink');
 Route::get('chats/{id}', 'Skill\SkillController@getSkill');
 Route::post('chats/edit', 'Skill\SkillController@editSkill');
 Route::post('chats/create', 'Skill\SkillController@createSkill');
 Route::post('chats/comment/create', 'Skill\SkillController@createSkillComment');
 Route::post('chats/comment/edit', 'Skill\SkillController@editSkillComment');
 Route::post('chats/todo/create', 'Skill\SkillController@createSkillTodo');
 Route::post('chats/todo/edit', 'Skill\SkillController@editSkillTodo');
 Route::post('chats/note/create', 'Skill\SkillController@createSkillNote');
 Route::post('chats/note/edit', 'Skill\SkillController@editSkillNote');
 Route::post('chats/timeline/create', 'Skill\SkillController@createSkillTimeline');
 Route::post('chats/timeline/edit', 'Skill\SkillController@editSkillTimeline');
 Route::post('chats/weblink/create', 'Skill\SkillController@createSkillWeblink');
 Route::post('chats/weblink/edit', 'Skill\SkillController@editSkillWeblink');

 Route::get('constants/level/{code}', 'ConstantsController@getLevel');
 Route::get('constants/icons/{type}', 'ConstantsController@getIcons');

});


