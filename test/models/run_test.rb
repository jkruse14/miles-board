require 'test_helper'

class RunTest < ActiveSupport::TestCase
  # test 'the truth' do
  #   assert true
  # end
  def setup
    @run = Run.new(distance: 3,
                   event: 'event',
                   user_id: 1,
                   team_id: 1)

    @user = User.new(name: 'Test User',
                     email: 'unit@test.com',
                     password: 'foobar',
                     password_confirmation: 'foobar',
                     user_type: 'user')

    @team = Team.new(name: 'Mill City Running',
                     team_owner_id: 1,
                     contact_email: 'mcr@test.com')

    @run.team = @team
    @run.user = @user
    @run.reload
  end

  test 'should be valid' do
    puts @run.inspect
    assert @run.valid?
  end

  test 'distance should be numeric' do
    @run.distance = 'abc'
    assert_not @run.valid?
  end

  test 'distance should be greater than 0' do
    @run.distance = 0
    assert_not @run.valid?
  end

  test 'distance should not be negative' do
    @run.distance = -1
    assert_not @run.valid?
  end

end
