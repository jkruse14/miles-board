require 'test_helper'

class TeamOwnersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get team_owners_index_url
    assert_response :success
  end

  test "should get create" do
    get team_owners_create_url
    assert_response :success
  end

  test "should get update" do
    get team_owners_update_url
    assert_response :success
  end

  test "should get delete" do
    get team_owners_delete_url
    assert_response :success
  end

end
