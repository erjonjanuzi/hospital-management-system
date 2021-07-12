import requests
import json


class InsertData:
    def __init__(self):
        self.inserCountryKosova()
        self.insertSpeciality1()
        self.insertSpeciality2()
        self.insertSpeciality3()
        self.insertSpeciality4()
        self.insertSpeciality5()
        self.insertSpeciality6()
        self.insertSpeciality7()
        self.insertSpeciality8()
        self.insertSpeciality9()
        self.insertSpeciality10()
        self.insertNationality1()
        self.insertNationality2()
        
    def inserCountryKosova(self):

        url = "http://localhost:5000/api/Country"

        payload = json.dumps({
        "id": "XK",
        "name": "Kosove",
        "cities": [
            {
            "name": "Prishtinë",
            "zip": "10000",
            "countryId": "XK"
            },
            {
            "name": "Mitrovicë",
            "zip": "40000",
            "countryId": "XK"
            },
            {
            "name": "Pejë",
            "zip": "30000",
            "countryId": "XK"
            },
            {
            "name": "Prizren",
            "zip": "20000",
            "countryId": "XK"
            },
            {
            "name": "Ferizaj",
            "zip": "70000",
            "countryId": "XK"
            },
            {
            "name": "Gjilan",
            "zip": "60000",
            "countryId": "XK"
            },
            {
            "name": "Gjakovë",
            "zip": "50000",
            "countryId": "XK"
            }
        ]
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Contry: Kosova. ADDED")

    def insertSpeciality1(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "ALLERGY AND IMMUNOLOGY",
        "description": "Specialists in allergy and immunology work with both adult and pediatric patients suffering from allergies and diseases of the respiratory tract or immune system. They may help patients suffering from common diseases such as asthma, food and drug allergies, immune deficiencies, and diseases of the lung. Specialists in allergy and immunology can pursue opportunities in research, education, or clinical practice.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 1. ADDED")

    def insertSpeciality2(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "ANESTHESIOLOGY",
        "description": "Anesthesiology is the branch of medicine dedicated to pain relief for patients before, during, and after surgery.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 2. ADDED")

    def insertSpeciality3(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "DERMATOLOGY",
        "description": "Dermatologists are physicians who treat adult and pediatric patients with disorders of the skin, hair, nails, and adjacent mucous membranes. They diagnose everything from skin cancer, tumors, inflammatory diseases of the skin, and infectious diseases. They also perform skin biopsies and dermatological surgical procedures.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 3. ADDED")

    def insertSpeciality4(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "DIAGNOSTIC RADIOLOGY",
        "description": "Physicians specializing in diagnostic radiology are trained to diagnose illnesses in patients through the use of x-rays, radioactive substances, sound waves in ultrasounds, or the body’s natural magnetism in magnetic resonance images (MRIs).",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 4. ADDED")

    def insertSpeciality5(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "NEUROLOGY",
        "description": "Neurology is the specialty within the medical field pertaining to nerves and the nervous system. Neurologists diagnose and treat diseases of the brain, spinal cord, peripheral nerves, muscles, autonomic nervous system, and blood vessels. Much of neurology is consultative, as neurologists treat patients suffering from strokes, Alzheimer’s disease, seizure disorders, and spinal cord disorders.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 5. ADDED")

    def insertSpeciality6(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "NUCLEAR MEDICINE",
        "description": "Physicians who practice nuclear medicine are called nuclear radiologists or nuclear medicine radiologists. They use radioactive materials to diagnose and treat diseases. Utilizing techniques such as scintigraphy, these physicians analyze images of the body's organs to visualize certain diseases. They may also use radiopharmaceuticals to treat hyperthyroidism, thyroid cancer, tumors, and bone cancer",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 6. ADDED")

    def insertSpeciality7(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "OBSTETRICS AND GYNECOLOGY",
        "description": "Obstetrician/gynecologists (OB/GYNs) care for the female reproductive system and associated disorders. This field of medicine encompasses a wide array of care, including the care of pregnant women, gynecologic care, oncology, surgery, and primary health care for women.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 7. ADDED")

    def insertSpeciality8(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "OPHTHALMOLOGY",
        "description": "Physicians specializing in ophthalmology develop comprehensive medical and surgical care of the eyes. Ophthalmologists diagnose and treat vision problems. They may treat strabismus, diabetic retinopathy, or perform surgeries on cataracts or corneal transplantation.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 8. ADDED")

    def insertSpeciality9(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "PATHOLOGY",
        "description": "A physician specializing in pathology studies the causes and nature of diseases. Through microscopic examination and clinical lab tests, pathologists work to diagnose, monitor, and treat diseases. They examine tissues, cells, and body fluids, applying biological, chemical, and physical sciences within the laboratory. They may examine tissues to determine whether an organ transplant is needed, or they may examine the blood of a pregnant woman to ensure the health of the fetus.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 9. ADDED")

    def insertSpeciality10(self):
        url = "http://localhost:5000/api/Specialty"

        payload = json.dumps({
        "name": "PEDIATRICS",
        "description": "Physicians specializing in pediatrics work to diagnose and treat patients from infancy through adolescence. Pediatricians practice preventative medicine and also diagnose common childhood diseases, such as asthma, allergies, and croup.",
        "doctors": []
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Speciality: 10. ADDED")

    def insertNationality1(self):
        url = "http://localhost:5000/api/Nationality"

        payload = json.dumps({
        "name": "Albanian"
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Nationality 1. ADDED")

    def insertNationality2(self):
        url = "http://localhost:5000/api/Nationality"

        payload = json.dumps({
        "name": "Other"
        })
        headers = {
        'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print("Nationality 2. ADDED")
insertDataObj = InsertData()