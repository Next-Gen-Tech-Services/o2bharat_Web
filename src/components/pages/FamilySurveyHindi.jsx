import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import FormApi from "../../apis/formApi/form.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import agarwalBg from "../../../public/Agarwal_bg.png";
import defaultBgForm from "../../../public/default-bg-form.png"

const FamilySurveyHindi = () => {
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

    const [subCastes, setSubCastes] = useState([]);
    const [gotras, setGotras] = useState([]);

    const [isOtherGotra, setIsOtherGotra] = useState(false);
    const [otherGotra, setOtherGotra] = useState("");

    const [selectedSubCasteId, setSelectedSubCasteId] = useState("");
    const [selectedGotraId, setSelectedGotraId] = useState("");

    const [selectedStateId, setSelectedStateId] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedCasteId, setSelectedCasteId] = useState("");
    const [selectedEducationId, setSelectedEducationId] = useState("");
    const [selectedOccupationId, setSelectedOccupationId] = useState("");
    const [surveyors, setSurveyors] = useState([]);

    const [surveyDetails, setSurveyDetails] = useState({
        surveyorId: "",
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
        subCaste: "",
        gotra: "",
        educationId: "",
        dob: "",
        age: "",
        occupationId: "",
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

    const emptyMember = () => ({
        name: "",
        gender: "",
        dob: "",
        age: "",
        maritalStatus: "",
        education: "",
        educationId: "",
        occupation: "",
        occupationId: "",
        mobile: "",
        relation: ""
    });

    const [memberCount, setMemberCount] = useState(1);

    const [members, setMembers] = useState([emptyMember()]);


    useEffect(() => {
        fetchStates();
        fetchCastes();
        fetchEducations();
        fetchOccupations();
    }, []);

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

    const getBackgroundImage = () => {
        switch (familyHead.subCaste?.toLowerCase()) {
            case "agarwal":
                return agarwalBg;

            default:
                return defaultBgForm;
        }
    };

    const validateStep1 = () => {
        const newErrors = {};

        Object.entries(surveyDetails).forEach(([key, value]) => {
            if (
                key === "surveyorId" ||
                key === "surveyorName" ||
                key === "surveyDate"
            ) {
                return;
            }

            if (!value?.toString().trim()) {
                newErrors[key] = "सभी आवश्यक फ़ील्ड भरें";
            }
        });

        if (
            surveyDetails.pinCode &&
            !/^\d{6}$/.test(surveyDetails.pinCode)
        ) {
            newErrors.pinCode = "पिन कोड 6 अंकों का होना चाहिए";
        }

        if (!selectedStateId) {
            newErrors.state = "Please select state";
        }

        if (!selectedCityId) {
            newErrors.city = "Please select city";
        }

        if (!selectedCasteId) {
            newErrors.caste = "कृपया जाति चुनें।";
        }

        if (!selectedSubCasteId) {
            newErrors.subCaste = "कृपया उपजाति चुनें।";
        }

        if (
            !memberCount ||
            Number(memberCount) < 1
        ) {
            newErrors.memberCount =
                "परिवार के सदस्यों की संख्या कम से कम 1 होनी चाहिए।";
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
            if (
                key === "email" ||
                key === "dob" ||
                key === "age" ||
                key === "gotra"
            ) {
                return;
            }


            if (!value?.toString().trim()) {
                newErrors[key] = "सभी आवश्यक फ़ील्ड भरें";
            }
        });

        // Either DOB or Age is required
        if (!familyHead.dob?.trim() && !familyHead.age?.trim()) {
            newErrors.age = "आयु या जन्म तिथि में से कोई एक भरना आवश्यक है";
        }

        if (
            familyHead.mobile &&
            !/^[6-9]\d{9}$/.test(familyHead.mobile)
        ) {
            newErrors.mobile = "मान्य 10 अंकों का मोबाइल नंबर दर्ज करें";
        }

        if (
            familyHead.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(familyHead.email)
        ) {
            newErrors.email = "मान्य ईमेल पता दर्ज करें";
        }

        if (isOtherGotra) {
            if (!otherGotra.trim()) {
                newErrors.gotra = "Please enter gotra";
            }
        } else if (!selectedGotraId) {
            newErrors.gotra = "Please select gotra";
        }

        if (!selectedEducationId) {
            newErrors.education = "कृपया शिक्षा चुनें।";
        }

        if (!selectedOccupationId) {
            newErrors.occupation = "कृपया व्यवसाय चुनें।";
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
                        "कृपया सभी सदस्य विवरण भरें"
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

            let gotraId = selectedGotraId;

            if (isOtherGotra) {
                const response = await formApi.createGotra({
                    name: otherGotra.trim(),
                    subCasteId: selectedSubCasteId,
                });

                gotraId = response?.data?.id || response?.data?.data?.id;
            }

            const payload = {
                familyNumber,
                surveyorId: surveyDetails.surveyorId || null,
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
                headSubCasteId: selectedSubCasteId,
                headGotraId: gotraId,
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
                toast.success("सर्वे सफलतापूर्वक जमा हो गया");

                setTimeout(() => {
                    navigate("/");
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }, 1500);
            } else {
                toast.error(
                    response?.data?.message || "Failed to submit survey"
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("कुछ त्रुटि हुई है");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchSurveyors = async (stateId, cityId, casteId, subCasteId) => {
        try {
            const res = await formApi.getSurveyors({
                stateId,
                cityId,
                casteId,
                subCasteId,
                page: 1,
                limit: 1000,
            });

            setSurveyors(res?.data?.data || res?.data || []);

        } catch (error) {
            console.log(error);
            setSurveyors([]);
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

    const fetchSubCastes = async (casteId) => {
        try {
            const res = await formApi.getSubCastes({
                casteId,
                page: 1,
                limit: 1000,
            });

            setSubCastes(res?.data || []);
        } catch (error) {
            console.log(error);
            setSubCastes([]);
        }
    };

    const fetchGotras = async (subCasteId) => {
        try {
            const res = await formApi.getGotras({
                subCasteId,
                page: 1,
                limit: 1000,
            });

            setGotras(res?.data || []);
        } catch (error) {
            console.log(error);
            setGotras([]);
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

    const hindi = {
        title: "पारिवारिक सर्वेक्षण",
        subtitle: "एक मजबूत और जुड़ा हुआ समाज बनाने में हमारी सहायता करें।",

        survey: "सर्वे विवरण",
        head: "परिवार प्रमुख",
        members: "सदस्य",

        state: "राज्य",
        city: "शहर",
        ward: "वार्ड / क्षेत्र",
        pinCode: "पिन कोड",
        surveyor: "सर्वेक्षक का नाम",

        next: "आगे बढ़ें",
        back: "वापस",

        yes: "हाँ",
        no: "नहीं",

        male: "पुरुष",
        female: "महिला",

        submit: "सर्वे जमा करें",
        submitting: "जमा किया जा रहा है...",
    };

    const labelClass =
        "block mb-2 text-sm font-semibold text-black";

    return (
        <div
            className="min-h-screen py-6 md:py-10 px-3 md:px-4 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${getBackgroundImage()})`,
            }}
        >
            <div className="text-center mb-10">
                <div
                    className="inline-flex px-5 py-2 rounded-full text-sm font-semibold mb-5"
                    style={{
                        background:
                            "linear-gradient(135deg,rgba(255,153,51,.12),rgba(19,136,8,.12))",
                        color: "#0A2A66"
                    }}
                >
                    O2Bharat सामुदायिक सर्वेक्षण
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-[#0A2A66]">
                    पारिवारिक सर्वेक्षण
                </h1>

                <p className="text-sm md:text-base text-gray-500 mt-3 px-4">
                    एक मजबूत और जुड़े हुए समाज के निर्माण में हमारी सहायता करें।
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
                            "सर्वे",
                            "प्रमुख",
                            "सदस्य"
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
                                <label className={labelClass}>राज्य</label>
                                <div className="relative">
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
                                                surveyorId: "",
                                                surveyorName: "",
                                            });

                                            setCities([]);

                                            if (selected?.id) {
                                                fetchCities(selected.id);
                                            }
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    >
                                        <option value="">राज्य चुनें</option>

                                        {states.map((state) => (
                                            <option key={state.id} value={state.name}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>शहर</label>
                                <div className="relative">
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
                                                surveyorId: "",
                                                surveyorName: "",
                                            });

                                            if (
                                                selected?.id &&
                                                selectedStateId &&
                                                selectedCasteId &&
                                                selectedSubCasteId
                                            ) {
                                                fetchSurveyors(
                                                    selectedStateId,
                                                    selected.id,
                                                    selectedCasteId,
                                                    selectedSubCasteId
                                                );
                                            }
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    >
                                        <option value="">
                                            {surveyDetails.state
                                                ? "शहर चुनें"
                                                : "पहले राज्य चुनें"}
                                        </option>

                                        {cities.map((city) => (
                                            <option key={city.id} value={city.name}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>जाति</label>
                                <div className="relative">
                                    <select
                                        value={familyHead.caste}
                                        onChange={(e) => {
                                            const selected = castes.find(
                                                (item) => item.name === e.target.value
                                            );

                                            setSelectedCasteId(selected?.id || "");

                                            setSelectedSubCasteId("");
                                            setSelectedGotraId("");

                                            setSubCastes([]);
                                            setGotras([]);

                                            setFamilyHead({
                                                ...familyHead,
                                                caste: selected?.name || "",
                                                subCaste: "",
                                                gotra: "",
                                            });

                                            if (selected?.id) {
                                                fetchSubCastes(selected.id);

                                                setSurveyors([]);

                                                setSurveyDetails(prev => ({
                                                    ...prev,
                                                    surveyorId: "",
                                                    surveyorName: "",
                                                }));
                                            }
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">Select Caste</option>

                                        {castes.map((caste) => (
                                            <option key={caste.id} value={caste.name}>
                                                {caste.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>उपजाति</label>
                                <div className="relative">
                                    <select
                                        value={familyHead.subCaste}
                                        disabled={!selectedCasteId}
                                        onChange={(e) => {
                                            const selected = subCastes.find(
                                                item => item.name === e.target.value
                                            );

                                            setSelectedSubCasteId(selected?.id || "");

                                            setSelectedGotraId("");
                                            setIsOtherGotra(false);
                                            setOtherGotra("");
                                            setGotras([]);

                                            setFamilyHead({
                                                ...familyHead,
                                                subCaste: selected?.name || "",
                                                gotra: "",
                                            });

                                            if (
                                                selectedStateId &&
                                                selectedCityId &&
                                                selected?.id
                                            ) {
                                                fetchSurveyors(
                                                    selectedStateId,
                                                    selectedCityId,
                                                    selectedCasteId,
                                                    selected.id
                                                );
                                            }

                                            if (selected?.id) {
                                                fetchGotras(selected.id);
                                            }
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">
                                            {selectedCasteId
                                                ? "उपजाति चुनें"
                                                : "पहले जाति चुनें"}
                                        </option>

                                        {subCastes.map(item => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>वार्ड / क्षेत्र</label>
                                <input
                                    value={surveyDetails.ward}
                                    onChange={(e) =>
                                        setSurveyDetails({
                                            ...surveyDetails,
                                            ward: e.target.value
                                        })
                                    }
                                    placeholder="वार्ड / क्षेत्र दर्ज करें"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>पिन कोड</label>
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
                                    placeholder="पिन कोड दर्ज करें"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>सर्वेक्षक का नाम (वैकल्पिक)</label>
                                <div className="relative">
                                    <select
                                        value={surveyDetails.surveyorId}
                                        onChange={(e) => {
                                            const selected = surveyors.find(
                                                (item) => item.id === e.target.value
                                            );

                                            setSurveyDetails({
                                                ...surveyDetails,
                                                surveyorId: selected?.id || "",
                                                surveyorName: selected?.name || "",
                                            });
                                        }}

                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">
                                        <option value="">सर्वेक्षक चुनें</option>
                                        {surveyors.map((surveyor) => (
                                            <option
                                                key={surveyor.id}
                                                value={surveyor.id}
                                            >
                                                {surveyor.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>
                                    परिवार के सदस्यों की संख्या
                                </label>

                                <input
                                    type="number"
                                    min={1}
                                    value={memberCount}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");

                                        setMemberCount(value === "" ? "" : Number(value));
                                    }}
                                    placeholder="Enter number of members"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>
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
                                आगे बढ़ें
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2 */}

                {step === 2 && (
                    <div className="space-y-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className={labelClass}>परिवार प्रमुख का नाम</label>
                                <input
                                    value={familyHead.name}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            name: e.target.value
                                        })
                                    }
                                    placeholder="परिवार प्रमुख का नाम दर्ज करें"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>लिंग</label>
                                <div className="relative">
                                    <select
                                        value={familyHead.gender}
                                        onChange={(e) =>
                                            setFamilyHead({
                                                ...familyHead,
                                                gender: e.target.value
                                            })
                                        }
                                        className=" w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10">

                                        <option value="">लिंग चुनें</option>
                                        <option value="MALE">पुरुष</option>
                                        <option value="FEMALE">महिला</option>
                                        {/* <option value="OTHER">Other</option> */}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>पिता / पति का नाम</label>
                                <input
                                    value={familyHead.fatherName}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            fatherName: e.target.value
                                        })
                                    }
                                    placeholder="पिता / पति का नाम दर्ज करें"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>गोत्र</label>

                                <div className="relative">
                                    <select
                                        value={familyHead.gotra}
                                        disabled={!selectedSubCasteId}
                                        onChange={(e) => {
                                            if (e.target.value === "__OTHER__") {
                                                setIsOtherGotra(true);
                                                setSelectedGotraId("");
                                                setFamilyHead({
                                                    ...familyHead,
                                                    gotra: "",
                                                });
                                                return;
                                            }

                                            setIsOtherGotra(false);
                                            setOtherGotra("");

                                            const selected = gotras.find(
                                                (item) => item.name === e.target.value
                                            );

                                            setSelectedGotraId(selected?.id || "");

                                            setFamilyHead({
                                                ...familyHead,
                                                gotra: selected?.name || "",
                                            });
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">
                                            {selectedSubCasteId
                                                ? "गोत्र चुनें"
                                                : "पहले उपजाति चुनें"}
                                        </option>

                                        {gotras.map(item => (
                                            <option key={item.id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                        <option value="__OTHER__">
                                            Other
                                        </option>
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                                {isOtherGotra && (
                                    <input
                                        type="text"
                                        value={otherGotra}
                                        onChange={(e) => {
                                            setOtherGotra(e.target.value);

                                            setFamilyHead((prev) => ({
                                                ...prev,
                                                gotra: e.target.value,
                                            }));
                                        }}
                                        placeholder="Enter Gotra"
                                        className="mt-3 w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    />
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>शिक्षा</label>
                                <div className="relative">
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
                                                educationId: selected?.id || "",
                                            });
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">Select Education</option>

                                        {educations.map((education) => (
                                            <option key={education.id} value={education.name}>
                                                {education.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>जन्म तिथि</label>
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
                                <label className={labelClass}>आयु</label>
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
                                    placeholder="आयु दर्ज करें"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>व्यवसाय</label>
                                <div className="relative">
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
                                                occupationId: selected?.id || "",
                                            });
                                        }}
                                        className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                    >
                                        <option value="">व्यवसाय चुनें</option>

                                        {occupations.map((occupation) => (
                                            <option key={occupation.id} value={occupation.name}>
                                                {occupation.name}
                                            </option>
                                        ))}
                                    </select>
                                    <FaChevronDown
                                        size={14}
                                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>मोबाइल नंबर</label>
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
                                    placeholder="मोबाइल नंबर दर्ज करें"
                                    className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                />
                            </div>

                            <div>
                                <label className={labelClass}>मूल निवास</label>
                                <input
                                    value={familyHead.nativePlace}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            nativePlace: e.target.value
                                        })
                                    }
                                    placeholder="मूल निवास दर्ज करें"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>

                            <div>
                                <label className={labelClass}>ईमेल आईडी (वैकल्पिक)</label>
                                <input
                                    value={familyHead.email}
                                    onChange={(e) =>
                                        setFamilyHead({
                                            ...familyHead,
                                            email: e.target.value
                                        })
                                    }
                                    placeholder="ईमेल आईडी दर्ज करें"
                                    className=" w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>वर्तमान पता</label>
                            <textarea
                                value={familyHead.address}
                                onChange={(e) =>
                                    setFamilyHead({
                                        ...familyHead,
                                        address: e.target.value
                                    })
                                }
                                rows={4}
                                placeholder="वर्तमान पता दर्ज करें"
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
                                वापस
                            </button>

                            <button
                                onClick={() => {
                                    if (validateStep2()) {
                                        setFormError("");
                                        const generatedMembers = Array.from(
                                            { length: Number(memberCount) },
                                            () => emptyMember()
                                        );

                                        setMembers(generatedMembers);

                                        setStep(3);
                                    }
                                }}
                                className="px-8 py-3 cursor-pointer rounded-full text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#FF9933,#138808)"
                                }}
                            >
                                आगे बढ़ें
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3 */}

                {step === 3 && (
                    <div>

                        <h2 className="text-2xl font-bold mb-4">
                            परिवार के सदस्य
                        </h2>

                        {members.map((m, index) => (
                            <div
                                key={index}
                                className=" relative grid md:grid-cols-4 gap-4 mb-6 bg-gradient-to-r from-[#FFF8F0] to-[#F6FBF6] rounded-3xl p-6 border border-[#FFE4C4]"
                            >
                                <div className="md:col-span-4 flex flex-wrap gap-3 items-center justify-between mb-2">

                                    <h3 className="font-bold text-[#0A2A66] text-base md:text-lg">
                                        सदस्य #{index + 1}
                                    </h3>


                                </div>
                                <div>
                                    <label className={labelClass}>नाम</label>
                                    <input
                                        value={m.name}
                                        onChange={(e) => {
                                            const updated = [...members];
                                            updated[index].name = e.target.value;
                                            setMembers(updated);
                                        }}
                                        placeholder="पूरा नाम दर्ज करें"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10 p-2" />
                                </div>

                                <div>
                                    <label className={labelClass}>लिंग</label>
                                    <div className="relative">
                                        <select
                                            value={m.gender}
                                            onChange={(e) => {
                                                const updated = [...members];
                                                updated[index].gender = e.target.value;
                                                setMembers(updated);
                                            }}
                                            className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                        >
                                            <option value="">लिंग चुनें</option>
                                            <option value="MALE">पुरुष</option>
                                            <option value="FEMALE">महिला</option>
                                            {/* <option value="OTHER">अन्य</option> */}
                                        </select>
                                        <FaChevronDown
                                            size={14}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>जन्म तिथि</label>
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
                                    <label className={labelClass}>आयु</label>
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
                                        placeholder="आयु दर्ज करें"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>वैवाहिक स्थिति</label>
                                    <div className="relative">
                                        <select
                                            value={m.maritalStatus}
                                            onChange={(e) => {
                                                const updated = [...members];
                                                updated[index].maritalStatus = e.target.value;
                                                setMembers(updated);
                                            }}
                                            className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                        >
                                            <option value="">वैवाहिक स्थिति चुनें</option>
                                            <option value="MARRIED">विवाहित</option>
                                            <option value="NEVER_MARRIED">अविवाहित</option>
                                            <option value="WIDOWED">विधवा / विधुर</option>
                                            <option value="DIVORCED">तलाकशुदा</option>
                                        </select>
                                        <FaChevronDown
                                            size={14}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>शिक्षा</label>
                                    <div className="relative">
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
                                            className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                        >
                                            <option value="">शिक्षा चुनें</option>

                                            {educations.map((education) => (
                                                <option key={education.id} value={education.name}>
                                                    {education.name}
                                                </option>
                                            ))}
                                        </select>
                                        <FaChevronDown
                                            size={14}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>व्यवसाय</label>
                                    <div className="relative">
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
                                            className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4"
                                        >
                                            <option value="">व्यवसाय चुनें</option>

                                            {occupations.map((occupation) => (
                                                <option key={occupation.id} value={occupation.name}>
                                                    {occupation.name}
                                                </option>
                                            ))}
                                        </select>
                                        <FaChevronDown
                                            size={14}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>मोबाइल नंबर</label>
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
                                        placeholder="मोबाइल नंबर दर्ज करें"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>परिवार प्रमुख से संबंध</label>
                                    <input value={m.relation}
                                        onChange={(e) => {
                                            const updated = [...members];
                                            updated[index].relation = e.target.value;
                                            setMembers(updated);
                                        }} placeholder="परिवार प्रमुख से संबंध दर्ज करें"
                                        className="w-full border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10" />
                                </div>
                            </div>
                        ))}

                        <h2 className="text-2xl font-bold mb-4">
                            सामाजिक जानकारी
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {[
                                {
                                    label: "परिवार में दिव्यांग व्यक्ति",
                                    key: "hasDisabledPerson",
                                    detailKey: "disabledPersonName",
                                    placeholder: "दिव्यांग व्यक्ति का नाम लिखें"
                                },
                                {
                                    label: "विवाह योग्य पुत्र / पुत्री",
                                    key: "hasMarriageableChild",
                                    detailKey: "marriageableChildName",
                                    placeholder: "विवाह योग्य सदस्य का नाम लिखें"
                                },
                                {
                                    label: "सामुदायिक गतिविधियों में भागीदारी",
                                    key: "participatesCommunity",
                                    detailKey: "communityMemberName",
                                    placeholder: "गतिविधि या सदस्य का नाम लिखें"
                                },
                            ].map((item) => (
                                <div key={item.key}>
                                    <label className={labelClass}>
                                        {item.label}
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={socialInfo[item.key]}
                                            onChange={(e) =>
                                                setSocialInfo({
                                                    ...socialInfo,
                                                    [item.key]: e.target.value === "true",
                                                })
                                            }
                                            className="w-full appearance-none border border-[#bec1c6] rounded-2xl px-4 py-4 outline-none transition focus:border-[#FF9933] focus:ring-4 focus:ring-[#FF9933]/10"
                                        >
                                            <option value="true">हाँ</option>
                                            <option value="false">नहीं</option>
                                        </select>
                                        <FaChevronDown
                                            size={14}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />
                                    </div>

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
                                अपने विचार साझा करें
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
                                placeholder="अपने विचार, सुझाव या प्रतिक्रिया लिखें"
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
                                    मैं पुष्टि करता / करती हूँ कि मेरे द्वारा दी गई जानकारी मेरी जानकारी के अनुसार सत्य एवं पूर्ण है।
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
                                    ? "जमा किया जा रहा है..."
                                    : isConfirmed
                                        ? "सर्वे जमा करें"
                                        : "पुष्टि करें और जमा करें"}
                            </button>
                        </div>

                    </div>
                )}
            </div>
            {showPreview && (
                <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#0A2A66]">
                                सर्वेक्षण विवरण की पुष्टि करें
                            </h2>

                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-red-500 font-bold text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Survey Details */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-3 text-[#0A2A66]">
                                सर्वेक्षण जानकारी
                            </h3>

                            <div className="grid md:grid-cols-2 gap-3">
                                <p><strong>राज्य:</strong> {surveyDetails.state}</p>
                                <p><strong>शहर:</strong> {surveyDetails.city}</p>
                                <p><strong>वार्ड / क्षेत्र:</strong> {surveyDetails.ward}</p>
                                <p><strong>पिन कोड:</strong> {surveyDetails.pinCode}</p>
                                <p><strong>सर्वेक्षक का नाम:</strong> {surveyDetails.surveyorName}</p>
                            </div>
                        </div>

                        {/* Family Head */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-3 text-[#0A2A66]">
                                परिवार प्रमुख की जानकारी
                            </h3>

                            <div className="grid md:grid-cols-2 gap-3">
                                <p><strong>नाम:</strong> {familyHead.name}</p>
                                <p><strong>लिंग:</strong> {familyHead.gender === "MALE" ? "पुरुष" : "महिला"}</p>
                                <p><strong>पिता / पति का नाम:</strong> {familyHead.fatherName}</p>
                                <p><strong>जाति:</strong> {familyHead.caste}</p>
                                <p><strong>उपजाति:</strong> {familyHead.subCaste}</p>
                                <p><strong>गोत्र:</strong> {familyHead.gotra}</p>
                                <p><strong>शिक्षा:</strong> {familyHead.education}</p>
                                <p><strong>व्यवसाय:</strong> {familyHead.occupation}</p>
                                <p><strong>मोबाइल नंबर:</strong> {familyHead.mobile}</p>
                                <p><strong>ईमेल:</strong> {familyHead.email || "-"}</p>
                                <p><strong>मूल निवास स्थान:</strong> {familyHead.nativePlace}</p>
                                <p><strong>आयु:</strong> {familyHead.age}</p>
                            </div>

                            <p className="mt-3">
                                <strong>वर्तमान पता:</strong> {familyHead.address}
                            </p>
                        </div>

                        {/* Members */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-3 text-[#0A2A66]">
                                परिवार के सदस्य ({members.length})
                            </h3>

                            {members.map((member, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-4 mb-3 bg-gray-50"
                                >
                                    <h4 className="font-semibold mb-2 text-[#138808]">
                                        सदस्य #{index + 1}
                                    </h4>

                                    <p><strong>नाम:</strong> {member.name}</p>
                                    <p>
                                        <strong>लिंग:</strong>{" "}
                                        {member.gender === "MALE" ? "पुरुष" : "महिला"}
                                    </p>
                                    <p><strong>आयु:</strong> {member.age}</p>
                                    <p><strong>रिश्ता:</strong> {member.relation}</p>
                                    <p><strong>शिक्षा:</strong> {member.education}</p>
                                    <p><strong>व्यवसाय:</strong> {member.occupation}</p>
                                </div>
                            ))}
                        </div>

                        {/* Social Info */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-3 text-[#0A2A66]">
                                सामाजिक जानकारी
                            </h3>

                            <p>
                                <strong>परिवार में दिव्यांग सदस्य:</strong>{" "}
                                {socialInfo.hasDisabledPerson
                                    ? socialInfo.disabledPersonName
                                    : "नहीं"}
                            </p>

                            <p>
                                <strong>विवाह योग्य पुत्र / पुत्री:</strong>{" "}
                                {socialInfo.hasMarriageableChild
                                    ? socialInfo.marriageableChildName
                                    : "नहीं"}
                            </p>

                            <p>
                                <strong>सामुदायिक गतिविधियों में सहभागिता:</strong>{" "}
                                {socialInfo.participatesCommunity
                                    ? socialInfo.communityMemberName
                                    : "नहीं"}
                            </p>

                            <p>
                                <strong>सुझाव / विचार:</strong>{" "}
                                {socialInfo.thoughts || "-"}
                            </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                कृपया सभी जानकारी ध्यानपूर्वक जांच लें। पुष्टि करने के बाद
                                सर्वेक्षण जमा कर दिया जाएगा और उसमें बदलाव नहीं किया जा सकेगा।
                            </p>
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="px-6 py-3 border rounded-xl"
                            >
                                जानकारी संशोधित करें
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
                                पुष्टि करें एवं जमा करें
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilySurveyHindi;