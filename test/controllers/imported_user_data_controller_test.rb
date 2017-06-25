require 'test_helper'

class ImportedUserDataControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get imported_user_data_index_url
    assert_response :success
  end

  test "should get show" do
    get imported_user_data_show_url
    assert_response :success
  end

  test "should get create" do
    get imported_user_data_create_url
    assert_response :success
  end

  test "should get update" do
    get imported_user_data_update_url
    assert_response :success
  end

  test "should get delete" do
    get imported_user_data_delete_url
    assert_response :success
  end

end
