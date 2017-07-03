require 'test_helper'

class CustomFiltersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get custom_filters_show_url
    assert_response :success
  end

  test "should get create" do
    get custom_filters_create_url
    assert_response :success
  end

  test "should get update" do
    get custom_filters_update_url
    assert_response :success
  end

  test "should get delete" do
    get custom_filters_delete_url
    assert_response :success
  end

end
