import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import FormApi from "../../apis/formApi/form.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FamilySurvey = () => {
    const [step, setStep] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const formApi = new FormApi();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [castes, setCastes] = useState([]);
    const [educations, setEducations] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [showPreview, setShowPreview] = useState(false);

    const [selectedStateId, setSelectedStateId] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedCasteId, setSelectedCasteId] = useState("");
    const [selectedEducationId, setSelectedEducationId] = useState("");
    const [selectedOccupationId, setSelectedOccupationId] = useState("");

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

        hasDisabledPerson: false,
        disabledPersonName: "",

        hasMarriageableChild: false,
        marriageableChildName: "",

        participatesCommunity: false,
        communityMemberName: "",

        thoughts: "",
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
            educationId: "",
            occupationId: "",
            mobile: "",
            relation: ""
        }
    ]);

    useEffect(() => {
        fetchStates();
        fetchCastes();
        fetchEducations();
        fetchOccupations();
    }, []);

    const addMember = () => {
        setMembers([
            ...members,
            {
                name: "",
                gender: "",
                dob: "",
                age: "",
                maritalStatus: "",
                educationId: "",
                occupationId: "",
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

    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff =
            today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 &&
                today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age >= 0 ? age.toString() : "";
    };

    const validateStep1 = () => {
        const newErrors = {};

        Object.entries(surveyDetails).forEach(([key, value]) => {
            if (
                key === "surveyorName" ||
                key === "surveyDate"
            ) {
                return;
            }

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

        if (!selectedStateId) {
            newErrors.state = "Please select state";
        }

        if (!selectedCityId) {
            newErrors.city = "Please select city";
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
            // optional fields
            if (key === "email" || key === "dob" || key === "age") {
                return;
            }

            if (!value?.toString().trim()) {
                newErrors[key] = "All fields are Required";
            }
        });

        // Either DOB or Age is required
        if (!familyHead.dob?.trim() && !familyHead.age?.trim()) {
            newErrors.age = "Either Age or Date of Birth is required";
        }

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

        if (!selectedCasteId) {
            newErrors.caste = "Please select caste";
        }

        if (!selectedEducationId) {
            newErrors.education = "Please select education";
        }

        if (!selectedOccupationId) {
            newErrors.occupation = "Please select occupation";
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

            // Required fields except DOB & Age
            const requiredFields = [
                "name",
                "gender",
                "maritalStatus",
                "education",
                "occupation",
                "relation",
            ];

            for (const field of requiredFields) {
                if (!member[field]?.toString().trim()) {
                    setFormError(
                        "Please complete all family member fields."
                    );
                    return false;
                }

                if (!member.educationId) {
                    setFormError(
                        "Please select education for all family members."
                    );
                    return false;
                }

                if (!member.occupationId) {
                    setFormError(
                        "Please select occupation for all family members."
                    );
                    return false;
                }
            }

            // Either DOB or Age is required
            if (!member.dob?.trim() && !member.age?.trim()) {
                setFormError(
                    "For each family member, either Age or Date of Birth is required."
                );
                return false;
            }

            if (
                member.mobile &&
                !/^[6-9]\d{9}$/.test(member.mobile)
            ) {
                setFormError(
                    "Please enter a valid 10 digit mobile number."
                );
                return false;
            }
        }

        setFormError("");
        return true;
    };

    const validateSocialInfo = () => {
        const checks = [
            {
                flag: socialInfo.hasDisabledPerson,
                value: socialInfo.disabledPersonName,
                label: "disabled person"
            },
            {
                flag: socialInfo.hasMarriageableChild,
                value: socialInfo.marriageableChildName,
                label: "marriageable son/daughter"
            },
            {
                flag: socialInfo.participatesCommunity,
                value: socialInfo.communityMemberName,
                label: "community participation"
            }
        ];

        for (const item of checks) {
            if (item.flag && !item.value.trim()) {
                setFormError(
                    `Please specify the ${item.label}.`
                );
                return false;
            }
        }

        return true;
    };

    const handleSubmitSurvey = async () => {
        try {
            setIsSubmitting(true);

            const stateCode = surveyDetails.state
                ?.trim()
                .substring(0, 2)
                .toLowerCase();

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

            const familyNumber = `fp-${stateCode}-${cityCode}-${headNameCode}-${casteCode}`;

            const payload = {
                familyNumber,
                surveyorName: surveyDetails.surveyorName,
                cityId: selectedCityId,
                stateId: selectedStateId,
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
                headCasteId: selectedCasteId,
                headDob: familyHead.dob,
                headAge: Number(familyHead.age) || 0,
                headMobile: familyHead.mobile,
                headEmail: familyHead.email,
                headNativePlace: familyHead.nativePlace,
                headEducationId: selectedEducationId,
                headOccupationId: selectedOccupationId,

                ...socialInfo,

                members: members.map((member) => ({
                    name: member.name,

                    gender:
                        member.gender?.toUpperCase() === "MALE"
                            ? "MALE"
                            : "FEMALE",

                    dob: member.dob,

                    age: Number(member.age) || 0,

                    maritalStatus:
                        member.maritalStatus || "UNMARRIED",

                    educationId: member.educationId,
                    occupationId: member.occupationId,

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

    const fetchStates = async () => {
        try {
            const res = await formApi.getStates({
                page: 1,
                limit: 1000,
                search: "",
            });

            console.log("stateee:: ", res);

            setStates(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCities = async (stateId) => {

        console.log("grfdbgf::", stateId);
        try {
            const res = await formApi.getCities({
                stateId,
                page: 1,
                limit: 1000,
                search: "",
            });

            setCities(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCastes = async () => {
        try {
            const res = await formApi.getCastes({
                page: 1,
                limit: 1000,
                search: "",
            });

            setCastes(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchEducations = async () => {
        try {
            const res = await formApi.getEducation({
                page: 1,
                limit: 1000,
                search: "",
            });

            setEducations(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOccupations = async () => {
        try {
            const res = await formApi.getOccupations({
                page: 1,
                limit: 1000,
                search: "",
            });

            setOccupations(res?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const labelClass =
        "block mb-2 text-sm font-semibold text-black";

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
                <div className="mb-8">
                    <div className="flex items-center justify-between relative">

                        {/* Progress Line */}
                        <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200 rounded-full z-0">
                            <div
                                className="h-1 rounded-full transition-all duration-300"
                                style={{
                                    width: `${((step - 1) / 2) * 100}%`,
                                    background:
                                        "linear-gradient(135deg,#FF9933,#138808)"
                                }}
                            />
                        </div>

                        {[
                            "Survey",
                            "Head",
                            "Members"
                        ].map((label, index) => (
                            <div
                                key={label}
                                className="relative z-10 flex flex-col items-center flex-1"
                            >
                                <div
                                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all
                    ${step >= index + 1
                                            ? "text-white"
                                            : "bg-white border-2 border-gray-300 text-gray-400"
                                        }`}
                                    style={
                                        step >= index + 1
                                            ? {
                                                background:
                                                    "linear-gradient(135deg,#FF9933,#138808)"
                                            }
                                            : {}
                                    }
                                >
                                    {index + 1}
                                </div>

                                <span
                                    className={`mt-2 text-[11px] md:text-sm font-semibold text-center
                    ${step >= index + 1
                                            ? "text-[#0A2A66]"
                                            : "text-gray-400"
                                        }`}
                                >
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STEP 1 */}

                {step === 1 && (
                    <div className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div>
                                <label className={labelClass}>State</label>
                                <select
                                    value={surveyDetails.state}
                                    onChange={(e) => {
                                        const selected = states.find(
                                            (item) => item.name === e.target.value
                                        );

                                        setSelectedStateId(selected?.id || "");

                                        setSurveyDetails({
                                            ...surveyDetails,
                                            state: selected?.name || "",
                                            city: "",
                                        });

                                        setCities([]);

                                        if (selected?.id) {
                                            fetchCities(selected.id);
                                        }
                                    }}
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                >
                                    <option value="">Select State</option>

                                    {states.map((state) => (
                                        <option key={state.id} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>City</label>
                                <select
                                    value={surveyDetails.city}
                                    disabled={!surveyDetails.state}
                                    onChange={(e) => {
                                        const selected = cities.find(
                                            (item) => item.name === e.target.value
                                        );

                                        setSelectedCityId(selected?.id || "");

                                        setSurveyDetails({
                                            ...surveyDetails,
                                            city: selected?.name || "",
                                        });
                                    }}
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                >
                                    <option value="">
                                        {surveyDetails.state
                                            ? "Select City"
                                            : "Select State First"}
                                    </option>

                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Ward / Area</label>
                                <input
                                    value={surveyDetails.ward}
                                    onChange={(e) =>
                                        setSurveyDetails({
                                            ...surveyDetails,
                                            ward: e.target.value
                                        })
                                    }
                                    placeholder="Enter Ward / Area"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>PIN Code</label>
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
                                    placeholder="Enter PIN Code"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Surveyor Name</label>
                            <select
                                value={surveyDetails.surveyorName}
                                onChange={(e) =>
                                    setSurveyDetails({
                                        ...surveyDetails,
                                        surveyorName: e.target.value
                                    })
                                }
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">
                                <option value="">Select Surveyor Name</option>
                                <option value="AJMER">Ajmer</option>
                                <option value="AMIT VERMA">Amit Verma</option>
                                <option value="SURESH GUPTA">Suresh Gupta</option>
                            </select>
                        </div>

                        {/* <div>
                            <label className={labelClass}>Survey Date</label>
                            <input
                                type="date"
                                value={surveyDetails.surveyDate}
                                disabled
                                className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none bg-gray-100 cursor-not-allowed w-full"
                            />
                        </div> */}

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

                            <div>
                                <label className={labelClass}>Family Head Name</label>
                                <input
                                    value={familyHead.name}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            name: e.target.value
                                        })
                                    }
                                    placeholder="Enter Family Head Name"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>Gender</label>
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
                                    {/* <option value="OTHER">Other</option> */}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Father / Husband Name</label>
                                <input
                                    value={familyHead.fatherName}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            fatherName: e.target.value
                                        })
                                    }
                                    placeholder="Enter Father / Husband Name"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>Caste</label>
                                <select
                                    value={familyHead.caste}
                                    onChange={(e) => {
                                        const selected = castes.find(
                                            (item) => item.name === e.target.value
                                        );

                                        setSelectedCasteId(selected?.id || "");

                                        setFamilyHead({
                                            ...familyHead,
                                            caste: selected?.name || "",
                                        });
                                    }}
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4"
                                >
                                    <option value="">Select Caste</option>

                                    {castes.map((caste) => (
                                        <option key={caste.id} value={caste.name}>
                                            {caste.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Education</label>
                                <select
                                    value={familyHead.education}
                                    onChange={(e) => {
                                        const selected = educations.find(
                                            (item) => item.name === e.target.value
                                        );

                                        setSelectedEducationId(selected?.id || "");

                                        setFamilyHead({
                                            ...familyHead,
                                            education: selected?.name || "",
                                        });
                                    }}
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4"
                                >
                                    <option value="">Select Education</option>

                                    {educations.map((education) => (
                                        <option key={education.id} value={education.name}>
                                            {education.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Date of Birth</label>
                                <input
                                    value={familyHead.dob}
                                    onChange={(e) => {
                                        const dob = e.target.value;

                                        setFamilyHead({
                                            ...familyHead,
                                            dob,
                                            age: calculateAge(dob),
                                        });
                                    }}
                                    type="date"
                                    max={new Date().toISOString().split("T")[0]}
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>Age</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={3}
                                    value={familyHead.age}
                                    readOnly={!!familyHead.dob}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");

                                        if (value === "" || Number(value) <= 100) {
                                            setFamilyHead({
                                                ...familyHead,
                                                age: value
                                            });
                                        }
                                    }}
                                    placeholder="Enter Age"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Occupation</label>
                                <select
                                    value={familyHead.occupation}
                                    onChange={(e) => {
                                        const selected = occupations.find(
                                            (item) => item.name === e.target.value
                                        );

                                        setSelectedOccupationId(selected?.id || "");

                                        setFamilyHead({
                                            ...familyHead,
                                            occupation: selected?.name || "",
                                        });
                                    }}
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4"
                                >
                                    <option value="">Select Occupation</option>

                                    {occupations.map((occupation) => (
                                        <option key={occupation.id} value={occupation.name}>
                                            {occupation.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={labelClass}>Mobile Number</label>
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
                                    placeholder="Enter Mobile Number"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Native Place</label>
                                <input
                                    value={familyHead.nativePlace}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            nativePlace: e.target.value
                                        })
                                    }
                                    placeholder="Enter Native Place"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>Email ID</label>
                                <input
                                    value={familyHead.email}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            email: e.target.value
                                        })
                                    }
                                    placeholder="Enter Email ID"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Current Address</label>
                            <textarea
                                value={familyHead.address}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        address: e.target.value
                                    })
                                }
                                rows={4}
                                placeholder="Enter Current Address"
                                className="border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10 w-full"
                            />
                        </div>

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
                                <div>
                                    <label className={labelClass}>Name</label>
                                    <input
                                        value={m.name}
                                        onChange={(e) => {
                                            const updated = [...members];
                                            updated[index].name = e.target.value;
                                            setMembers(updated);
                                        }}
                                        placeholder="Enter Fullname"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10 p-2" />
                                </div>

                                <div>
                                    <label className={labelClass}>Gender</label>
                                    <select
                                        value={m.gender}
                                        onChange={(e) => {
                                            const updated = [...members];
                                            updated[index].gender = e.target.value;
                                            setMembers(updated);
                                        }}
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        {/* <option value="OTHER">Other</option> */}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Date of Birth</label>
                                    <input
                                        type="date"
                                        max={new Date().toISOString().split("T")[0]}
                                        value={m.dob}
                                        onChange={(e) => {
                                            const updated = [...members];

                                            updated[index].dob = e.target.value;
                                            updated[index].age = calculateAge(
                                                e.target.value
                                            );

                                            setMembers(updated);
                                        }}
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Age</label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={3}
                                        value={m.age}
                                        readOnly={!!m.dob}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");

                                            if (value === "" || Number(value) <= 100) {
                                                const updated = [...members];
                                                updated[index].age = value;
                                                setMembers(updated);
                                            }
                                        }}
                                        placeholder="Enter Age"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Marital Status</label>
                                    <select
                                        value={m.maritalStatus}
                                        onChange={(e) => {
                                            const updated = [...members];
                                            updated[index].maritalStatus = e.target.value;
                                            setMembers(updated);
                                        }}
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    >
                                        <option value="">Select Marital Status</option>
                                        <option value="MARRIED">Married</option>
                                        <option value="NEVER_MARRIED">Unmarried</option>
                                        <option value="WIDOWED">Widow</option>
                                        <option value="DIVORCED">Divorsee</option>
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Education</label>
                                    <select
                                        value={m.education}
                                        onChange={(e) => {
                                            const selected = educations.find(
                                                (item) => item.name === e.target.value
                                            );

                                            const updated = [...members];

                                            updated[index].education = selected?.name || "";
                                            updated[index].educationId = selected?.id || "";

                                            setMembers(updated);
                                        }}
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">Select Education</option>

                                        {educations.map((education) => (
                                            <option key={education.id} value={education.name}>
                                                {education.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Occupation</label>
                                    <select
                                        value={m.occupation}
                                        onChange={(e) => {
                                            const selected = occupations.find(
                                                (item) => item.name === e.target.value
                                            );

                                            const updated = [...members];

                                            updated[index].occupation = selected?.name || "";
                                            updated[index].occupationId = selected?.id || "";

                                            setMembers(updated);
                                        }}
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">Select Occupation</option>

                                        {occupations.map((occupation) => (
                                            <option key={occupation.id} value={occupation.name}>
                                                {occupation.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Mobile Number</label>
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
                                        placeholder="Enter Mobile Number"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Relation With Head</label>
                                    <input value={m.relation}
                                        onChange={(e) => {
                                            const updated = [...members];
                                            updated[index].relation = e.target.value;
                                            setMembers(updated);
                                        }} placeholder="Enter Relation With Head"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                                </div>
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
                                    label: "Disabled Person In Family",
                                    key: "hasDisabledPerson",
                                    detailKey: "disabledPersonName",
                                    placeholder: "Who is the disabled person?"
                                },
                                {
                                    label: "Marriageable Son/Daughter",
                                    key: "hasMarriageableChild",
                                    detailKey: "marriageableChildName",
                                    placeholder: "Who is marriageable?"
                                },
                                {
                                    label: "Participation In Community Activities",
                                    key: "participatesCommunity",
                                    detailKey: "communityMemberName",
                                    placeholder: "Which activities / who participates?"
                                },
                            ].map((item) => (
                                <div key={item.key}>
                                    <label className={labelClass}>
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

                                    {socialInfo[item.key] && (
                                        <input
                                            value={socialInfo[item.detailKey]}
                                            onChange={(e) =>
                                                setSocialInfo({
                                                    ...socialInfo,
                                                    [item.detailKey]: e.target.value,
                                                })
                                            }
                                            placeholder={item.placeholder}
                                            className="mt-3 w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <label className={labelClass}>
                                Share Your Thoughts
                            </label>

                            <textarea
                                rows={4}
                                value={socialInfo.thoughts}
                                onChange={(e) =>
                                    setSocialInfo({
                                        ...socialInfo,
                                        thoughts: e.target.value,
                                    })
                                }
                                placeholder="Share your thoughts, suggestions, or feedback"
                                className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                            />
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
                                onClick={() => {
                                    if (!validateMembers()) return;

                                    if (!validateSocialInfo()) return;

                                    setShowPreview(true);
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
            {
                showPreview && (
                    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-[#0A2A66]">
                                    Review Survey Details
                                </h2>

                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="text-red-500 font-bold"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Survey Details */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg mb-3">
                                    Survey Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-3">
                                    <p><strong>State:</strong> {surveyDetails.state}</p>
                                    <p><strong>City:</strong> {surveyDetails.city}</p>
                                    <p><strong>Ward:</strong> {surveyDetails.ward}</p>
                                    <p><strong>PIN:</strong> {surveyDetails.pinCode}</p>
                                    <p><strong>Surveyor:</strong> {surveyDetails.surveyorName}</p>
                                </div>
                            </div>

                            {/* Family Head */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg mb-3">
                                    Family Head
                                </h3>

                                <div className="grid md:grid-cols-2 gap-3">
                                    <p><strong>Name:</strong> {familyHead.name}</p>
                                    <p><strong>Gender:</strong> {familyHead.gender}</p>
                                    <p><strong>Father/Husband:</strong> {familyHead.fatherName}</p>
                                    <p><strong>Caste:</strong> {familyHead.caste}</p>
                                    <p><strong>Education:</strong> {familyHead.education}</p>
                                    <p><strong>Occupation:</strong> {familyHead.occupation}</p>
                                    <p><strong>Mobile:</strong> {familyHead.mobile}</p>
                                    <p><strong>Email:</strong> {familyHead.email || "-"}</p>
                                    <p><strong>Native Place:</strong> {familyHead.nativePlace}</p>
                                    <p><strong>Age:</strong> {familyHead.age}</p>
                                </div>

                                <p className="mt-3">
                                    <strong>Address:</strong> {familyHead.address}
                                </p>
                            </div>

                            {/* Members */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg mb-3">
                                    Family Members ({members.length})
                                </h3>

                                {members.map((member, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-xl p-4 mb-3"
                                    >
                                        <p><strong>Name:</strong> {member.name}</p>
                                        <p><strong>Gender:</strong> {member.gender}</p>
                                        <p><strong>Age:</strong> {member.age}</p>
                                        <p><strong>Relation:</strong> {member.relation}</p>
                                        <p><strong>Education:</strong> {member.education}</p>
                                        <p><strong>Occupation:</strong> {member.occupation}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Social Info */}
                            <div className="mb-8">
                                <h3 className="font-bold text-lg mb-3">
                                    Social Information
                                </h3>

                                <p>
                                    <strong>Disabled Person:</strong>{" "}
                                    {socialInfo.hasDisabledPerson
                                        ? socialInfo.disabledPersonName
                                        : "No"}
                                </p>

                                <p>
                                    <strong>Marriageable Child:</strong>{" "}
                                    {socialInfo.hasMarriageableChild
                                        ? socialInfo.marriageableChildName
                                        : "No"}
                                </p>

                                <p>
                                    <strong>Community Participation:</strong>{" "}
                                    {socialInfo.participatesCommunity
                                        ? socialInfo.communityMemberName
                                        : "No"}
                                </p>

                                <p>
                                    <strong>Thoughts:</strong>{" "}
                                    {socialInfo.thoughts || "-"}
                                </p>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="px-6 py-3 border rounded-xl"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={async () => {
                                        setShowPreview(false);
                                        await handleSubmitSurvey();
                                    }}
                                    className="px-6 py-3 text-white rounded-xl"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#FF9933,#138808)"
                                    }}
                                >
                                    Confirm & Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default FamilySurvey;