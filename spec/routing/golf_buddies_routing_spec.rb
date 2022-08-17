require "rails_helper"

RSpec.describe GolfBuddiesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/golf_buddies").to route_to("golf_buddies#index")
    end

    it "routes to #show" do
      expect(get: "/golf_buddies/1").to route_to("golf_buddies#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/golf_buddies").to route_to("golf_buddies#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/golf_buddies/1").to route_to("golf_buddies#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/golf_buddies/1").to route_to("golf_buddies#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/golf_buddies/1").to route_to("golf_buddies#destroy", id: "1")
    end
  end
end
