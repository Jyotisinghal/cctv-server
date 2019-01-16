require 'test_helper'

class CctvControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get cctv_home_url
    assert_response :success
  end

end
