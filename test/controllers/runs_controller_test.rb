require 'test_helper'

class RunsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index,' do
    get runs_index, _url
    assert_response :success
  end

  test 'should get show,' do
    get runs_show, _url
    assert_response :success
  end

  test 'should get create,' do
    get runs_create, _url
    assert_response :success
  end

  test 'should get update,' do
    get runs_update, _url
    assert_response :success
  end

  test 'should get delete' do
    get runs_delete_url
    assert_response :success
  end

end
