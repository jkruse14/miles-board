require 'test_helper'

class InvitationCodesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get invitation_codes_index_url
    assert_response :success
  end

  test "should get show" do
    get invitation_codes_show_url
    assert_response :success
  end

  test "should get create" do
    get invitation_codes_create_url
    assert_response :success
  end

  test "should get update" do
    get invitation_codes_update_url
    assert_response :success
  end

  test "should get delete" do
    get invitation_codes_delete_url
    assert_response :success
  end

end
