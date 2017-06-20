require 'test_helper'

class TeamTest < ActiveSupport::TestCase
  def setup
    @team = Team.new(name: 'Mill City Running',
                     team_owner_id: 1,
                     contact_email: 'mcr@test.com')
  end

  test 'should be valid' do
    assert @team.valid?
  end

  test 'should require a name' do
    @team.name = ''
    assert_not @team.valid?
  end

  test 'should require an owner' do
    @team.team_owner_id = nil
    assert_not @team.valid?
  end

  test 'should be invalid -- contact_email required' do
    @team.contact_email = nil
    assert_not @team.valid?
  end

  test 'name should not be too long' do
    @team.name = 'a' * 51
    assert_not @team.valid?
  end

  test 'contact_email should not be too long' do
    @team.contact_email = 'a' * 244 + '@example.com'
    assert_not @team.valid?
  end

  test 'contact_email validation should accept valid addresses' do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @team.contact_email = valid_address
      assert @team.valid?, '#{valid_address.inspect} should be valid'
    end
  end

  # test 'contact_email addresses should be unique' do
  #   duplicate_team = @team.dup
  #   duplicate_team.contact_email = @team.contact_email.upcase
  #   @team.save
  #   assert_not team.valid?
  # end

  test 'contact_email addresses should be saved as lower-case' do
    mixed_case_email = 'Foo@ExAMPle.CoM'
    @team.contact_email = mixed_case_email
    @team.save
    assert_equal mixed_case_email.downcase, @team.reload.contact_email
  end

end
