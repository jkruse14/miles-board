require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  fixtures :users

  def setup
    @user = User.create(name: 'Test User',
                     email: 'unit@test.com',
                     password: 'foobar',
                     password_confirmation: 'foobar',
                     user_type: 'user')
  end

  test 'should get index' do
    get users_path_url
    assert_response :success
  end

  test 'should get show' do
    get users_show_url(1)
    assert_response :success
  end

  test 'should get create' do
    get users_create_url
    assert_response :success
  end

  test 'should get update' do
    get users_update_url
    assert_response :success
  end

  test 'should get delete' do
    get users_delete_url(1)
    assert_response :success
  end

end


require 'test_helper'