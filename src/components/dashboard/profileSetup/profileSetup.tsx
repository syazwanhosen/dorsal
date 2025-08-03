import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsFillPencilFill } from "react-icons/bs";

import chase from "@/assets/svg/chase.svg";
import paypal from "@/assets/svg/Paypal.svg";
import citi from "@/assets/svg/citi.svg";
import bank from "@/assets/svg/Bank.svg";
import jago from "@/assets/svg/Jago.svg";
import mandiri from "@/assets/svg/mandiri.svg";
import bca from "@/assets/svg/BCA.svg";

const bankIcons = [chase, paypal, citi, bank, jago, mandiri, bca];


const ProfileSetup = () => {

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [selectedBank, setSelectedBank] = useState<number | "other" | null>(
    null
  );

  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]); // Track completed steps

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      setCompletedSteps((prev) => [...prev, step + 1]); // Store completed steps
    }
  };


  return (
    <div className="max-w-3xl mx-auto lg:p-6 p-3 rounded-lg space-y-6">
      {/* Step Labels */}
        <div className="grid grid-cols-3 w-full items-center relative">
        {/* Step 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-2 justify-start w-full">
          <div className="absolute top-3 left-[18%] h-[1px] w-[20%] bg-[#E7E7F4] hidden lg:block"></div>

          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full font-semibold ${
              completedSteps.includes(1) ? "bg-[#6E39CB] text-white" : "bg-purple-300 text-white"
            }`}
          >
            1
          </div>
          <span
            className={`text-sm font-semibold ${
              completedSteps.includes(1) ? "text-[#6E39CB]" : "text-[#D3BBFE]"
            } lg:text-base`}
          >
            About
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col lg:flex-row items-center gap-2 justify-center relative w-full">
          <div className="absolute top-3 left-[85%] h-[1px] w-[60%] bg-[#E7E7F4] hidden lg:block"></div>

          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full font-semibold ${
              completedSteps.includes(2) ? "bg-[#6E39CB] text-white" : "bg-purple-300 text-white"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-semibold ${
              completedSteps.includes(2) ? "text-[#6E39CB]" : "text-[#D3BBFE]"
            } lg:text-base`}
          >
            Account
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-2 justify-end w-full">
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full font-semibold ${
              completedSteps.includes(3) ? "bg-[#6E39CB] text-white" : "bg-purple-300 text-white"
            }`}
          >
            3
          </div>
          <span
            className={`text-sm font-semibold ${
              completedSteps.includes(3) ? "text-[#6E39CB]" : "text-[#D3BBFE]"
            } lg:text-base`}
          >
            Address
          </span>
        </div>
      </div>

      {/* Card Wrapper */}
      <Card className="mt-10 border-gray-300">
        <CardContent className="lg:p-6 p-3">
          {/* Step 1: About */}
          {step === 1 && (
            <>
              <div className="text-center w-full lg:w-[400px] mx-auto lg:pb-6 lg:pt-3 pb-4">
                <h4 className="text-xl font-medium text-[#3A3541] mb-2">
                  Basic Information
                </h4>
                <small className="text-[#3A3541] text-sm">
                  Let us know your name and email address. Use an address you
                  don’t mind other users contacting you at.
                </small>
              </div>

              {/* Profile Photo Upload */}

              <div className="flex flex-col lg:flex-row items-start gap-4 pb-8 lg:pt-4">
                {/* Profile Avatar Wrapper */}
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        profilePhoto ? URL.createObjectURL(profilePhoto) : ""
                      }
                    />
                    <AvatarFallback className="bg-gray-300">AB</AvatarFallback>
                  </Avatar>

                  {/* Edit Button Positioned Over Image */}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 h-6 px-1 rounded-full bg-[#6E39CB] flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    <BsFillPencilFill 

                      className="h-3 w-4 text-white"
                      fill="currentColor"
                    />
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        setProfilePhoto(e.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>

                {/* Profile Description Text (Moves Below on Mobile) */}
                <div className="text-gray-600 text-sm lg:text-base pt-2">
                  <p className="font-semibold text-sm text-[#3A3541]">
                    Profile Photo
                  </p>
                  <small className="text-[#89868D]">
                    This photo will be displayed on your profile.
                  </small>
                </div>
              </div>

              <form className="space-y-6">
                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter first name"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter last name"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Date of Birth
                    </Label>
                    <Input
                      type="date"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">City</Label>
                    <Input
                      type="text"
                      placeholder="Enter city"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Postal Code
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter postal code"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    onClick={nextStep}
                    className="bg-purple text-white px-10 py-2 rounded-md shadow-md"
                  >
                    Next
                  </Button>
                </div>
              </form>
            </>
          )}

          {/* Step 2: Account */}
          {step === 2 && (
            <>
              <div className="text-center w-full lg:w-[300px] mx-auto lg:pb-6 pb-3 lg:pt-3">
                <h4 className="text-xl font-medium text-[#3A3541] mb-2">
                  Link Your Account
                </h4>
                <small className="text-[#3A3541] text-sm">
                  Account can be your bank, credit card or your wallet.
                </small>
              </div>

              <form className="space-y-6">
                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Account Name
                    </Label>

                    <Input
                      type="text"
                      placeholder="Name"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">
                      Account Type
                    </Label>
                    <Input
                      type="Type"
                      placeholder="Enter last name"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Bank</Label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
  {/* Bank Icons Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
    {/* Bank Icons List */}
    {[...bankIcons, "other"].map((icon, index) => (
      <div
        key={index}
        className={`flex items-center justify-center p-2 bg-[#F4F5F9] rounded-md cursor-pointer ${
          selectedBank === index ||
          (icon === "other" && selectedBank === "other")
            ? "border-2 border-[#8770BC]"
            : ""
        }`}
        onClick={() => setSelectedBank(icon === "other" ? "other" : index)}
      >
        {icon === "other" ? (
          <span className="text-[#3A3541] text-sm font-medium">Other</span>
        ) : (
          <img src={icon} alt={`Bank ${index + 1}`} className="h-6 w-6" />
        )}
      </div>
    ))}
  </div>
</div>


                {/* Next Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    onClick={nextStep}
                    className="bg-purple text-white px-10 py-2 rounded-md shadow-md"
                  >
                    Next
                  </Button>
                </div>
              </form>
            </>
          )}

          {/* Step 3: Address */}
          {step === 3 && (
            <>
              <div className="text-center w-full lg:w-[400px] mx-auto lg:pb-6 pb-3 lg:pt-3">
                <h4 className="text-xl font-medium text-[#3A3541] mb-2">
                  Are you living in nice area?
                </h4>
                <small className="text-[#3A3541] text-sm">
                  One thing I love about the later sunsets is the chance to go
                  for a walk through the neighborhood woods before dinner.
                </small>
              </div>
              <form className="space-y-6">
                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Street Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter street name"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Street No
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter street number"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">City</Label>
                    <Input
                      type="text"
                      placeholder="Enter city"
                      className="border-gray-300 bg-[#F4F5F9] pb-6 lg:pb-3 py-2"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600 pb-2 block">
                      Country
                    </Label>
                    <select className="flex h-10 w-full rounded-md border px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-[#F4F5F9] lg:pb-3 py-2">
                      <option value="">Select a country</option>
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-purple text-white px-10 py-2 rounded-md shadow-md"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
