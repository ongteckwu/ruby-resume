require 'test_helper'
require 'generators/teckwu_gen/teckwu_gen_generator'

class TeckwuGenGeneratorTest < Rails::Generators::TestCase
  tests TeckwuGenGenerator
  destination Rails.root.join('tmp/generators')
  setup :prepare_destination

  # test "generator runs without errors" do
  #   assert_nothing_raised do
  #     run_generator ["arguments"]
  #   end
  # end
end
