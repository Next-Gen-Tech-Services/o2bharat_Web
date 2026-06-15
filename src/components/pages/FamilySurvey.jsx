import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import FormApi from "../../apis/formApi/form.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";

const FamilySurvey = () => {
    const [step, setStep] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const formApi = new FormApi();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [surveyDetails, setSurveyDetails] = useState({
        surveyorName: "",
        state: "",
        city: "",
        ward: "",
        pinCode: "",
        surveyDate: new Date().toISOString().split("T")[0]
    });

    const [familyHead, setFamilyHead] = useState({
        name: "",
        gender: "",
        fatherName: "",
        caste: "",
        education: "",
        dob: "",
        age: "",
        occupation: "",
        mobile: "",
        nativePlace: "",
        email: "",
        address: ""
    });

    const [socialInfo, setSocialInfo] = useState({
        hasSeniorCitizen: false,
        hasWidow: false,
        hasDisabledPerson: false,
        hasMarriageableChild: false,
        participatesCommunity: false,
    });

    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState("");

    const [members, setMembers] = useState([
        {
            name: "",
            gender: "",
            dob: "",
            age: "",
            maritalStatus: "",
            education: "",
            occupation: "",
            mobile: "",
            relation: ""
        }
    ]);

    const indiaStates = State.getStatesOfCountry("IN");

    const selectedState = indiaStates.find(
        (state) => state.name === surveyDetails.state
    );

    const cities = selectedState
        ? City.getCitiesOfState("IN", selectedState.isoCode)
        : [];

    const addMember = () => {
        setMembers([
            ...members,
            {
                name: "",
                gender: "",
                dob: "",
                age: "",
                maritalStatus: "",
                education: "",
                occupation: "",
                mobile: "",
                relation: ""
            }
        ]);
    };

    const removeMember = (indexToRemove) => {
        if (members.length === 1) return;

        setMembers(
            members.filter((_, index) => index !== indexToRemove)
        );
    };

    const validateStep1 = () => {
        const newErrors = {};

        Object.entries(surveyDetails).forEach(([key, value]) => {
            if (!value?.toString().trim()) {
                newErrors[key] = "All fields are Required";
            }
        });

        if (
            surveyDetails.pinCode &&
            !/^\d{6}$/.test(surveyDetails.pinCode)
        ) {
            newErrors.pinCode = "PIN Code must be 6 digits";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setFormError(Object.values(newErrors)[0]);
            return false;
        }

        setFormError("");
        return true;
    };

    const validateStep2 = () => {
        const newErrors = {};

        Object.entries(familyHead).forEach(([key, value]) => {
            if (!value?.toString().trim()) {
                newErrors[key] = "All fields are Required";
            }
        });

        if (
            familyHead.mobile &&
            !/^[6-9]\d{9}$/.test(familyHead.mobile)
        ) {
            newErrors.mobile = "Enter a valid 10 digit mobile number";
        }

        if (
            familyHead.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(familyHead.email)
        ) {
            newErrors.email = "Enter a valid email address";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setFormError(Object.values(newErrors)[0]);
            return false;
        }

        setFormError("");
        return true;
    };

    const validateMembers = () => {
        for (let member of members) {
            const isValid = Object.values(member).every(
                (value) => value?.toString().trim()
            );

            if (!isValid) {
                setFormError("Please complete all family member fields.");
                return false;
            }
        }
        setFormError("");

        return true;
    };

    const handleSubmitSurvey = async () => {
        try {
            setIsSubmitting(true);

            const stateCode =
                selectedState?.isoCode?.toLowerCase() || "";

            const cityCode = surveyDetails.city
                ?.trim()
                .substring(0, 2)
                .toLowerCase();

            const nameParts = familyHead.name
                ?.trim()
                .split(/\s+/)
                .filter(Boolean);

            let headNameCode = "";

            if (nameParts.length === 1) {
                headNameCode = nameParts[0]
                    .substring(0, 2)
                    .toLowerCase();
            } else {
                headNameCode = nameParts
                    .map(word => word[0])
                    .join("")
                    .substring(0, 2)
                    .toLowerCase();
            }

            const casteCode = familyHead.caste
                ?.trim()
                .substring(0, 2)
                .toLowerCase();

            const familyName = `fp-${stateCode}-${cityCode}-${headNameCode}-${casteCode}`;

            const payload = {
                familyName,
                surveyorName: surveyDetails.surveyorName,
                city: surveyDetails.city,
                state: surveyDetails.state,
                wardArea: surveyDetails.ward,
                pinCode: surveyDetails.pinCode,
                currentAddress: familyHead.address,
                surveyDate: surveyDetails.surveyDate,

                headName: familyHead.name,
                headGender:
                    familyHead.gender?.toUpperCase() === "MALE"
                        ? "MALE"
                        : "FEMALE",

                headFatherHusbandName: familyHead.fatherName,
                headGotra: familyHead.caste,
                headDob: familyHead.dob,
                headAge: Number(familyHead.age) || 0,
                headMobile: familyHead.mobile,
                headNativePlace: familyHead.nativePlace,
                headEducation: familyHead.education,
                headOccupation: familyHead.occupation,

                ...socialInfo,

                members: members.map((member) => ({
                    name: member.name,

                    gender:
                        member.gender?.toUpperCase() === "MALE"
                            ? "MALE"
                            : "FEMALE",

                    dob: member.dob,

                    age: 0,

                    maritalStatus:
                        member.maritalStatus || "NEVER_MARRIED",

                    education: member.education,
                    occupation: member.occupation,
                    mobileNumber: member.mobile,
                    relationWithHead: member.relation,
                })),
            };

            const response = await formApi.submitFamilyForm(payload);

            console.log("jomklds,obfmdk,::::: ", response);

            if (
                response?.success ||
                response?.data?.status === "Success"
            ) {
                toast.success("Survey submitted successfully");

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                toast.error(
                    response?.data?.message || "Failed to submit survey"
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-6 md:py-10 px-3 md:px-4" style={{
            background:
                "linear-gradient(135deg,#FFF4E8 0%,#F6F9F5 50%,#EAF7ED 100%)"
        }}>
            <div className="text-center mb-10">
                <div
                    className="inline-flex px-5 py-2 rounded-full text-sm font-semibold mb-5"
                    style={{
                        background:
                            "linear-gradient(135deg,rgba(255,153,51,.12),rgba(19,136,8,.12))",
                        color: "#0A2A66"
                    }}
                >
                    O2Bharat Community Survey
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-[#0A2A66]">
                    Family Survey
                </h1>

                <p className="text-sm md:text-base text-gray-500 mt-3 px-4">
                    Help us build a stronger and more connected community.
                </p>
            </div>
            <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white p-4 md:p-8">

                {/* Progress */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 mb-12">

                    {[
                        "Survey Details",
                        "Family Head",
                        "Members & Social"
                    ].map((label, index) => (
                        <div key={label} className="flex items-center">

                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${step > index ? "text-white" : "bg-white text-gray-400"}`}
                                style={
                                    step > index
                                        ? {
                                            background:
                                                "linear-gradient(135deg,#FF9933,#138808)"
                                        }
                                        : {}
                                }
                            >
                                {index + 1}
                            </div>

                            <span className="mx-2 text-xs md:text-sm font-semibold text-[#0A2A66] text-center">
                                {label}
                            </span>

                            {index !== 2 && (
                                <div className="hidden md:block w-20 h-[3px] bg-gray-200 rounded-full" />
                            )}

                        </div>
                    ))}
                </div>

                {/* STEP 1 */}

                {step === 1 && (
                    <div className="space-y-6">

                        <div>
                            <select
                                value={surveyDetails.surveyorName}
                                onChange={(e) =>
                                    setSurveyDetails({
                                        ...surveyDetails,
                                        surveyorName: e.target.value
                                    })
                                }
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">
                                <option value="">Surveyor Name</option>
                                <option value="AJMER">Ajmer</option>
                                <option value="AMIT VERMA">Amit Verma</option>
                                <option value="SURESH GUPTA">Suresh Gupta</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <select
                                value={surveyDetails.state}
                                onChange={(e) =>
                                    setSurveyDetails({
                                        ...surveyDetails,
                                        state: e.target.value,
                                        city: ""
                                    })
                                }
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            >
                                <option value="">Select State</option>

                                {indiaStates.map((state) => (
                                    <option key={state.isoCode} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={surveyDetails.city}
                                disabled={!surveyDetails.state}
                                onChange={(e) =>
                                    setSurveyDetails({
                                        ...surveyDetails,
                                        city: e.target.value
                                    })
                                }
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            >
                                <option value="">
                                    {surveyDetails.state
                                        ? "Select City"
                                        : "Select State First"}
                                </option>

                                {cities.map((city) => (
                                    <option key={city.name} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                value={surveyDetails.ward}
                                onChange={(e) =>
                                    setSurveyDetails({
                                        ...surveyDetails,
                                        ward: e.target.value
                                    })
                                }
                                placeholder="Ward / Area"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                value={surveyDetails.pinCode}
                                onChange={(e) =>
                                    setSurveyDetails({
                                        ...surveyDetails,
                                        pinCode: e.target.value.replace(/\D/g, "")
                                    })
                                }
                                placeholder="PIN Code"
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            />
                        </div>

                        <input
                            type="date"
                            value={surveyDetails.surveyDate}
                            disabled
                            className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none bg-gray-100 cursor-not-allowed w-full"
                        />

                        {formError && (
                            <p className="text-red-500 text-sm text-center font-medium">
                                {formError}
                            </p>
                        )}


                        <div className="text-right">
                            <button
                                onClick={() => {
                                    if (validateStep1()) {
                                        setFormError("");
                                        setStep(2);
                                    }
                                }}
                                className="px-8 py-3 cursor-pointer rounded-full text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#FF9933,#138808)"
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2 */}

                {step === 2 && (
                    <div className="space-y-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <input
                                value={familyHead.name}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        name: e.target.value
                                    })
                                }
                                placeholder="Family Head Name"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <select
                                value={familyHead.gender}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        gender: e.target.value
                                    })
                                }
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">

                                <option value="">Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>

                            <input
                                value={familyHead.fatherName}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        fatherName: e.target.value
                                    })
                                }
                                placeholder="Father / Husband Name"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <input
                                value={familyHead.caste}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        caste: e.target.value
                                    })
                                }
                                placeholder="Caste"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <input
                                value={familyHead.education}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        education: e.target.value
                                    })
                                }
                                placeholder="Education"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <input
                                value={familyHead.dob}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        dob: e.target.value
                                    })
                                }
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={3}
                                value={familyHead.age}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");

                                    if (value === "" || Number(value) <= 100) {
                                        setFamilyHead({
                                            ...familyHead,
                                            age: value
                                        });
                                    }
                                }}
                                placeholder="Age"
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            />

                            <input
                                value={familyHead.occupation}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        occupation: e.target.value
                                    })
                                }
                                placeholder="Occupation"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={10}
                                value={familyHead.mobile}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        mobile: e.target.value.replace(/\D/g, "")
                                    })
                                }
                                placeholder="Mobile Number"
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            />

                            <input
                                value={familyHead.nativePlace}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        nativePlace: e.target.value
                                    })
                                }
                                placeholder="Native Place"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />

                            <input
                                value={familyHead.email}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        email: e.target.value
                                    })
                                }
                                placeholder="Email ID"
                                className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                        </div>

                        <textarea
                            value={familyHead.address}
                            onChange={(e) =>
                                setFamilyHead({
                                    ...familyHead,
                                    address: e.target.value
                                })
                            }
                            rows={4}
                            placeholder="Current Address"
                            className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10 w-full"
                        />

                        {formError && (
                            <p className="text-red-500 text-sm text-center font-medium">
                                {formError}
                            </p>
                        )}

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep(1)}
                                className="border border-[#bec1c6] cursor-pointer rounded-2xl px-4 py-2 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            >
                                Back
                            </button>

                            <button
                                onClick={() => {
                                    if (validateStep2()) {
                                        setFormError("");
                                        setStep(3);
                                    }
                                }}
                                className="px-8 py-3 cursor-pointer rounded-full text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#FF9933,#138808)"
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3 */}

                {step === 3 && (
                    <div>

                        <h2 className="text-2xl font-bold mb-4">
                            Family Members
                        </h2>

                        {members.map((m, index) => (
                            <div
                                key={index}
                                className=" relative grid md:grid-cols-4 gap-4 mb-6 bg-gradient-to-r from-[#FFF8F0] to-[#F6FBF6] rounded-3xl p-6 border border-[#FFE4C4]"
                            >
                                <div className="md:col-span-4 flex flex-wrap gap-3 items-center justify-between mb-2">

                                    <h3 className="font-bold text-[#0A2A66] text-base md:text-lg">
                                        Family Member #{index + 1}
                                    </h3>

                                    {members.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeMember(index)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition">
                                            <FaTrash size={14} />
                                        </button>
                                    )}

                                </div>
                                <input
                                    value={m.name}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].name = e.target.value;
                                        setMembers(updated);
                                    }}
                                    placeholder="Name"
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10 p-2" />
                                <select
                                    value={m.gender}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].gender = e.target.value;
                                        setMembers(updated);
                                    }}
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                <input
                                    type="date"
                                    max={new Date().toISOString().split("T")[0]}
                                    value={m.dob}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].dob = e.target.value;
                                        setMembers(updated);
                                    }}
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={3}
                                    value={m.age}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");

                                        if (value === "" || Number(value) <= 100) {
                                            const updated = [...members];
                                            updated[index].age = value;
                                            setMembers(updated);
                                        }
                                    }}
                                    placeholder="Age"
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                                <select
                                    value={m.maritalStatus}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].maritalStatus = e.target.value;
                                        setMembers(updated);
                                    }}
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                >
                                    <option value="">Select Marital Status</option>
                                    <option value="NEVER_MARRIED">Never Married</option>
                                    <option value="DIVORCED">Divorced</option>
                                    <option value="WIDOWED">Widowed</option>
                                    <option value="AWAITING_DIVORCE">Awaiting Divorce</option>
                                    <option value="ANNULLED">Annulled</option>
                                </select>
                                <input value={m.education}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].education = e.target.value;
                                        setMembers(updated);
                                    }} placeholder="Education"
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                                <input value={m.occupation}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].occupation = e.target.value;
                                        setMembers(updated);
                                    }} placeholder="Occupation"
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={m.mobile}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].mobile = e.target.value.replace(/\D/g, "");
                                        setMembers(updated);
                                    }}
                                    placeholder="Mobile Number"
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                                <input value={m.relation}
                                    onChange={(e) => {
                                        const updated = [...members];
                                        updated[index].relation = e.target.value;
                                        setMembers(updated);
                                    }} placeholder="Relation With Head"
                                    className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>
                        ))}

                        <button
                            onClick={addMember}
                            className=" w-full sm:w-auto mb-8 px-6 py-3 rounded-full font-semibold text-[#0A2A66] bg-[#FFF4E8]  border border-[#FFD6AA] hover:scale-105 transition">
                            + Add Member
                        </button>

                        <h2 className="text-2xl font-bold mb-4">
                            Social Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {[
                                {
                                    label: "Senior Citizen In Family",
                                    key: "hasSeniorCitizen",
                                },
                                {
                                    label: "Widow In Family",
                                    key: "hasWidow",
                                },
                                {
                                    label: "Disabled Person In Family",
                                    key: "hasDisabledPerson",
                                },
                                {
                                    label: "Marriageable Son/Daughter",
                                    key: "hasMarriageableChild",
                                },
                                {
                                    label: "Participation In Community Activities",
                                    key: "participatesCommunity",
                                },
                            ].map((item) => (
                                <div key={item.key}>
                                    <label className="block mb-2">
                                        {item.label}
                                    </label>

                                    <select
                                        value={socialInfo[item.key]}
                                        onChange={(e) =>
                                            setSocialInfo({
                                                ...socialInfo,
                                                [item.key]: e.target.value === "true",
                                            })
                                        }
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-8 mb-6 bg-gradient-to-r from-[#FFF8F0] to-[#F6FBF6] border border-[#FFE4C4] rounded-2xl p-5">

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isConfirmed}
                                    onChange={(e) => setIsConfirmed(e.target.checked)}
                                    className="mt-1 w-5 h-5 accent-[#138808] cursor-pointer" />

                                <span className="text-sm md:text-base text-[#0A2A66] font-medium leading-relaxed">
                                    I confirm that the information provided by me is true and complete
                                    to the best of my knowledge.
                                </span>
                            </label>
                        </div>

                        {formError && (
                            <p className="text-red-500 text-sm text-center font-medium">
                                {formError}
                            </p>
                        )}

                        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between mt-8">
                            <button
                                onClick={() => setStep(2)}
                                className="border border-[#bec1c6] cursor-pointer rounded-2xl px-4 py-2 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            >
                                Back
                            </button>

                            <button
                                disabled={!isConfirmed}
                                onClick={async () => {
                                    if (!validateMembers()) return;

                                    await handleSubmitSurvey();
                                }}
                                className={`px-8 py-3 rounded-full text-white transition ${!isConfirmed ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}`}

                                style={{
                                    background:
                                        "linear-gradient(135deg,#FF9933,#138808)"
                                }}
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : isConfirmed
                                        ? "Submit Survey"
                                        : "Confirm & Submit"}
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default FamilySurvey;