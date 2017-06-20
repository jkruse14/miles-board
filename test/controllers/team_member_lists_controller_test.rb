require 'test_helper'

class TeamMemberListsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get team_member_lists_index_url
    assert_response :success
  end

  test "should get show" do
    get team_member_lists_show_url
    assert_response :success
  end

  test "should get create" do
    get team_member_lists_create_url
    assert_response :success
  end

  test "should get update" do
    get team_member_lists_update_url
    assert_response :success
  end

end
