import streamlit as st
from datetime import datetime as dt

# --- PAGE CONFIG ---
st.set_page_config(
    page_title="Mohammed Al-Dokimi | Portfolio",
    page_icon="🤖",
    layout="wide",
)

# --- INJECT CUSTOM CSS ---
st.markdown(
    """
<style>
/* Force white theme */
[data-testid="stAppViewContainer"] {
    background-color: #ffffff;
}

[data-testid="stAppViewContainer"] > .main {
    background-color: #ffffff;
}

.stApp {
    background-color: #ffffff;
}

body {
    background-color: #ffffff !important;
}

.main {
    background-color: #ffffff !important;
}

/* Ensure default text is dark for readability */
p, span, div, h1, h2, h3, h4, h5, h6 {
    color: #31333F;
}

/* Preserve link colors */
a {
    color: #1f77b4;
}

/* Clean up streamlit branding */
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}

/* Custom Footer */
.custom-footer {
    margin-top: 3rem;
    padding: 1.5rem 0;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    color: #666;
    font-size: 0.9rem;
}

/* Sticky Navigation Bar */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 0.75rem 0;
    margin-bottom: 1rem;
}

.navbar-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.navbar a {
    color: #31333F;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar a:hover {
    background-color: #f0f2f6;
    color: #1f77b4;
}

/* Add padding to body to account for fixed navbar and maintain margins */
.main .block-container {
    padding-top: 4rem;
    margin-left: 35%;
    margin-right: 35%;
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Improve header spacing - reduced by 50% */
h1, h2, h3 {
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
}

/* Reduce spacing between sections and elements */
.stMarkdown {
    margin-bottom: 0.5rem;
}

/* Reduce spacing in Streamlit containers */
.element-container {
    margin-bottom: 0.5rem;
}

/* Reduce divider spacing */
hr {
    margin: 0.5rem 0;
}

/* Style for the skill 'tags' - reduced spacing by 50% */
.skill-tag {
    display: inline-block;
    background-color: #f0f2f6; /* Streamlit's light gray */
    color: #31333F; /* Streamlit's dark text */
    padding: 0.15rem 0.375rem;
    margin: 0.1rem;
    border-radius: 0.5rem;
    font-weight: 500;
}

/* Style for project boxes - reduced spacing by 50% */
.project-box {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.project-box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.project-box h4 {
    margin-top: 0;
    margin-bottom: 0.375rem;
    color: #1f77b4;
}

.project-box p {
    margin-bottom: 0.5rem;
    color: #666;
    flex-grow: 1;
}

.project-technologies {
    margin-top: auto;
}

/* Style for skill/certification boxes - reduced spacing by 50% */
.skill-box {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.skill-box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.skill-box h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #1f77b4;
    font-size: 1.2rem;
}

.skill-box > div {
    flex-grow: 1;
}

.skill-box p {
    margin-bottom: 0.5rem;
    color: #666;
}

.skill-box h4 {
    margin-top: 0;
    margin-bottom: 0.375rem;
    color: #31333F;
    font-size: 1rem;
}

.skill-box ul {
    margin: 0;
    padding-left: 1.2rem;
}

.skill-box li {
    margin-bottom: 0.25rem;
    color: #666;
}

/* Ensure columns have equal heights */
[data-testid="column"] {
    display: flex;
    flex-direction: column;
}

[data-testid="column"] > div {
    display: flex;
    flex-direction: column;
    flex: 1;
}

/* Ensure boxes fill their container height */
[data-testid="column"] .project-box,
[data-testid="column"] .skill-box {
    flex: 1;
    min-height: 100%;
}

</style>
""",
    unsafe_allow_html=True,
)


# --- DATA FROM CV ---
CONTACT_INFO = {
    "Location": "Budapest",
    "Email": "mo.aldokimi@gmail.com",
    "LinkedIn": "linkedin.com/in/mohammed-al-dokimi-98ba411a5",
}

SKILLS = {
    "Automation & Infrastructure": [
        "Openstack",
        "Kubernetes",
        "Docker/Podman",
        "Terraform",
        "Ansible",
        "Grafana",
        "RHEL",
        "Cert-Manager",
        "Helm",
    ],
    "Security": [
        "Tenable",
        "Anchor",
        "Vulnerability Assessment & Management",
        "User Management (IdM)",
        "Vault/HSM/Secrets Management",
        "Compliance (CIS, ANSSI)",
        "Security Hardening",
    ],
    "AI/ML": [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Red Hat AI",
        "LLM Serving (llama.cpp)",
    ],
    "Programming & Frameworks": [
        "Python",
        "Golang",
        "Java",
        "C",
        "C++",
        "Bash",
        "Javascript",
        "Typescript",
        "PHP",
        "Bash",
        "Flask/Django",
        "Angular",
        "Laravel",
    ],
    "Collaboration & Methodologies": [
        "Agile/Scrum",
        "Git",
        "Gerrit",
        "Jira",
        "Confluence",
    ],
}

CERTIFICATIONS = [
    {
        "name": "Red Hat Certified OpenShift Administrator",
        "date": "Nov 2025",
        "url": "https://www.redhat.com/en/services/certification/rhcs-paas",
        "verify": "https://rhtapps.redhat.com/verify?certId=240-201-996",
    },
    {
        "name": "Red Hat Certified Engineer (RHCE)",
        "date": "May 2025",
        "url": "https://www.redhat.com/en/services/certification/rhce",
        "verify": "https://rhtapps.redhat.com/verify?certId=240-201-996",
    },
    {
        "name": "Red Hat Certified Specialist in Containers",
        "date": "May 2025",
        "url": "https://www.redhat.com/en/services/certification/rhcs-container",
        "verify": "https://rhtapps.redhat.com/verify?certId=240-201-996",
    },
    {
        "name": "Red Hat Certified System Administrator (RHCSA)",
        "date": "Jan 2025",
        "url": "https://www.redhat.com/en/services/certification/rhcsa",
        "verify": "https://rhtapps.redhat.com/verify?certId=240-201-996",
    },
    {
        "name": "IELTS from British Council",
        "date": "Feb 2023",
        "url": "https://ieltsregistration.britishcouncil.org/",
        "verify": None,
    },
    {
        "name": "IoT Fundamentals: Big Data & Analytics",
        "date": "Nov 2022",
        "url": "https://www.netacad.com/courses/data-analytics-essentials?courseLang=en-US",
        "verify": None,
    },
    {
        "name": "CCNAv7: Introduction to Networks",
        "date": "May 2021",
        "url": "https://www.netacad.com/courses/ccna-introduction-networks?courseLang=en-US",
        "verify": None,
    },
]


PROJECTS = [
    {
        "name": "Self-Signed Certificates",
        "description": "A project for generating and managing self-signed certificates for development environments.",
        "url": "https://github.com/aldokimi/self-signed-certs",
        "technologies": ["Shell Scripting", "Docker", "Nginx", "OpenSSL"],
    },
    {
        "name": "YouTube Statistics",
        "description": "A web application that provides statistics about YouTube channels. Containerized and deployed to a local Kubernetes cluster.",
        "url": "https://github.com/aldokimi/YouTube-Statistics",
        "technologies": ["Go", "Docker", "Kubernetes", "HTML"],
    },
    {
        "name": "Book Rental System (BRS)",
        "description": "A simple book rental system built with the Laravel PHP framework.",
        "url": "https://github.com/aldokimi/BRS",
        "technologies": ["PHP", "Laravel", "MySQL"],
    },
    {
        "name": "Decentralized Version Control System (MVCS)",
        "description": "A decentralized version control system designed to help developers in small teams or projects avoid the complexity of modern version control systems.",
        "url": "https://github.com/aldokimi/MVCS",
        "technologies": ["Python", "Django", "MySQL", "Redux", "React", "Docker"],
    },
    {
        "name": "API Builder",
        "description": "A tool that creates interactive RESTful APIs from your data.",
        "url": "https://github.com/aldokimi/API-Builder",
        "technologies": ["Python", "Django", "MySQL", "Typescript", "React", "Docker"],
    },
    {
        "name": "Stadium Teams",
        "description": "A project for managing stadium teams and related operations.",
        "url": "https://github.com/aldokimi/Stadium-Teams",
        "technologies": ["PHP", "CSS", "HTML", "JavaScript"],
    },
    {
        "name": "Pet Catalogue",
        "description": "A project focused on cataloging and managing pet information.",
        "url": "https://github.com/aldokimi/PetCatalogue",
        "technologies": ["Angular", "Spring Boot", "MySQL", "Laravel", "PHP", "Typescript"],
    },
    {
        "name": "Tower Defense Game",
        "description": "A game remake of the famous game 'Tower Defense'",
        "url": "https://github.com/aldokimi/Tower-Defence-Game",
        "technologies": ["Java", "Gradle", "JavaFX", "libGDX"],
    },
    {
        "name": "Edicius",
        "description": "A survival game made by using Java.",
        "url": "https://github.com/talalquleh/edicius",
        "technologies": ["Java", "Gradle"],
    },
    {
        "name": "MultiSocket Controller",
        "description": "A project involving multi-socket controller functionality for managing network connections.",
        "url": "https://github.com/aldokimi/MultiSocketController",
        "technologies": ["Python", "Socket Programming"],
    },
    {
        "name": "Multiprocessing Vaccination Simulation",
        "description": "A program that simulates vaccination processes using multiprocessing techniques.",
        "url": "https://github.com/aldokimi/Multiprocessing-Vaccination-Simulation-Program",
        "technologies": ["C", "Multiprocessing", "Threading"],
    },
]

# --- EDUCATION DATA ---
EDUCATION = [
    {
        "degree": "BSc in Computer Science",
        "institution": "Eötvös Loránd University (ELTE)",
        "location": "Budapest, Hungary",
        "period": "2020 - 2023",
        "gpa": "4.54/5",
    },
    {
        "degree": "Foundation Semester in Engineering",
        "institution": "University of Debrecen",
        "location": "Debrecen, Hungary",
        "period": "2019 - 2020",
        "gpa": "4/5",
    },
    {
        "degree": "High School Diploma",
        "institution": "Jamal Abd Al-Nasser High School for Outstanding Students",
        "location": "Sana'a, Yemen",
        "period": "2019 - 2020",
        "gpa": "97%",
    },
]

# --- HELPER FUNCTION FOR SKILLS ---
def render_skills(skills_list):
    """Renders a list of skills as styled tags."""
    tags_html = "".join(
        [f'<span class="skill-tag">{skill}</span>' for skill in skills_list]
    )
    st.markdown(f"<div>{tags_html}</div>", unsafe_allow_html=True)


# =================================================================================
# --- NAVIGATION BAR ---
# =================================================================================
st.markdown(
    """
    <nav class="navbar">
        <div class="navbar-content">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#skills">Skills & Certifications</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>
    """,
    unsafe_allow_html=True,
)

# =================================================================================
# --- HERO & ABOUT ME ---
# =================================================================================


col1, col2, col3 = st.columns([1, 4, 1])
with col2:
    col1_z, col2_z = st.columns([1, 5])
    with col1_z:
        # Placeholder image - replace with a URL to your own photo
        st.image(
            "https://avatars.githubusercontent.com/u/48590625?v=4",
            width=150,
            use_container_width="auto",
        )

    with col2_z:
        st.title("Mohammed Al-Dokimi")
        st.subheader("Software Developer | DevOps and Infrastructure Engineering")
        st.write(
            "I'm a Software Developer specializing in Security, Cloud Infrastructure, and DevOps. "
            "I love building secure, scalable, and efficient systems that solve real-world problems."
        )
    st.write("---")
    # --- ABOUT ME ---
    st.markdown('<div id="about"></div>', unsafe_allow_html=True)
    st.header("About Me")
    st.markdown(
        """
        - 🚀 I graduated from the Eötvös Loránd University in Budapest, Hungary with a Bachelor's degree in Computer Science. I graduated with a GPA of 4.54/5.0 and a title "Outstanding". I'm currently working as a Software Developer at RedHat specializing in Security, Cloud Infrastructure, and DevOps. I also teach imperative programming languages (mainly C programming) to students at the university.
        """
    )

    # =================================================================================
    # --- WORK EXPERIENCE ---
    # =================================================================================
    st.markdown('<div id="experience"></div>', unsafe_allow_html=True)
    st.title("Work Experience")

    st.write("---")
    st.subheader("Teaching/Research Assistant - Eötvös Loránd University")
    st.markdown("**February 2021 - Present** | Budapest, Hungary")
    st.info(
        """
        - Teaching Imperative Programming using C programming.
        - Contributing to quantum research using Python, GROQ GPUs, and Qiskit for quantum simulation.
        """
    )

    st.write("---")
    st.subheader("Software Developer - NOKIA")
    st.markdown("**August 2021 - September 2022** | Budapest, Hungary")
    st.info(
        """
        Worked as a Software Engineer Intern at Nokia, gaining valuable experience in software development, team collaboration, and industry best practices. Contributed to various projects and learned about enterprise software development. I was a part of the security team, developing new features, debugging issues, and fixing bugs.
        """
    )

    st.write("---")
    st.subheader("Software Developer - NOKIA")
    st.markdown("**September 2022 - January 2024** | Budapest, Hungary")
    st.info(
        """
        I continued in the same team but now as a Software developer. Here where I got more responsibilities, since I contributed in major features (like certificate management of the whole cluster, implemented security hardening, developed APIs, implemented CLIs, etc...)
        """
    )

    st.write("---")
    st.subheader("Software Developer - RedHat ")
    st.markdown(
        "<b>January 2024 - Present</b> | <b>Budapest, Hungary</b>",
        unsafe_allow_html=True,
    )
    st.success(
        """
        When I joined RedHat, I was a part of the Security team, as me and the whole department were transferred from Nokia to RedHat. I continued my responsibilities from Nokia, but also took on new, critical security-related tasks: automation, risk assessment, security scanning, and vulnerability assessment.
        """
    )

    # =================================================================================
    # --- EDUCATION & RESEARCH ---
    # =================================================================================
    st.markdown('<div id="education"></div>', unsafe_allow_html=True)
    st.title("Education")

    st.write("---")


    # Display education in boxes, 3 per row
    for i in range(0, len(EDUCATION), 3):
        cols = st.columns(3)
        for j in range(3):
            if i + j < len(EDUCATION):
                edu = EDUCATION[i + j]
                with cols[j]:
                    edu_box_html = f"""
                    <div class="skill-box">
                        <h3>{edu['degree']}</h3>
                        <p style="margin-bottom: 0.5rem;"><strong>{edu['institution']}</strong></p>
                        <p style="margin-bottom: 0.5rem; color: #666;">{edu['location']}</p>
                        <p style="margin-bottom: 0.5rem; color: #666;"><strong>Period:</strong> {edu['period']}</p>
                        <p style="margin-bottom: 0; color: #666;"><strong>GPA:</strong> {edu['gpa']}</p>
                    </div>
                    """
                    st.markdown(edu_box_html, unsafe_allow_html=True)

    # =================================================================================
    # --- SKILLS & CERTIFICATIONS ---
    # =================================================================================
    st.markdown('<div id="skills"></div>', unsafe_allow_html=True)
    st.title("Skills & Certifications")

    st.write("---")

    # =================================================================================
    # --- TECHNICAL EXPERTISE ---
    # =================================================================================
    st.header("Technical Expertise")

    # Create list of all skill categories
    skill_categories = [
        ("Automation & Infrastructure", SKILLS["Automation & Infrastructure"]),
        ("Security", SKILLS["Security"]),
        ("AI/ML", SKILLS["AI/ML"]),
        ("Programming & Frameworks", SKILLS["Programming & Frameworks"]),
        ("Collaboration & Methodologies", SKILLS["Collaboration & Methodologies"]),
    ]

    # Display skill categories in boxes, 3 per row
    for i in range(0, len(skill_categories), 3):
        cols = st.columns(3)
        for j in range(3):
            if i + j < len(skill_categories):
                category, skills_list = skill_categories[i + j]
                skills_html = "".join(
                    [f'<span class="skill-tag">{skill}</span>' for skill in skills_list]
                )
                with cols[j]:
                    box_html = f"""
                    <div class="skill-box">
                        <h3>{category}</h3>
                        <div>{skills_html}</div>
                    </div>
                    """
                    st.markdown(box_html, unsafe_allow_html=True)

    st.write("---")

    # =================================================================================
    # --- CERTIFICATIONS ---
    # =================================================================================
    st.header("Certifications")

    # Display certifications in boxes, 3 per row
    for i in range(0, len(CERTIFICATIONS), 3):
        cols = st.columns(3)
        for j in range(3):
            if i + j < len(CERTIFICATIONS):
                cert = CERTIFICATIONS[i + j]
                with cols[j]:
                    cert_box_html = (
                        f"""
                    <div class="skill-box">
                        <h3><a href="{cert['url']}" target="_blank" style="text-decoration: none; color: #1f77b4;">{cert['name']}</a></h3>"""
                        + (
                            f"<a href='{cert['verify']}' target='_blank' style='text-decoration: none; color: #1f77b4;'>Verify a Red Hat Certified Professional</a>"
                            if cert["verify"]
                            else ""
                        )
                        + f"""
                        <p style="color: #666; margin-bottom: 0;"><strong>Earned at:</strong> {cert['date']}</p>
                    </div>
                    """
                    )
                    st.markdown(cert_box_html, unsafe_allow_html=True)


    # =================================================================================
    # --- PROJECTS ---
    # =================================================================================
    st.write("---")
    st.markdown('<div id="projects"></div>', unsafe_allow_html=True)
    st.title("Projects")

    # Display projects in a grid of 3 columns
    for i in range(0, len(PROJECTS), 3):
        cols = st.columns(3)
        for j in range(3):
            if i + j < len(PROJECTS):
                project = PROJECTS[i + j]
                with cols[j]:
                    # Create project box
                    project_html = f"""
                    <div class="project-box">
                        <h4>🔗 <a href="{project['url']}" target="_blank" style="text-decoration: none; color: #1f77b4;">{project['name']}</a></h4>
                        <p>{project['description']}</p>
                        <div class="project-technologies">
                            <strong>Technologies:</strong><br>
                            {''.join([f'<span class="skill-tag">{tech}</span>' for tech in project['technologies']])}
                        </div>
                    </div>
                    """
                    st.markdown(project_html, unsafe_allow_html=True)

    # =================================================================================
    # --- CONTACT ---
    # =================================================================================
    st.markdown('<div id="contact"></div>', unsafe_allow_html=True)
    st.write("---")
    st.title("Contact")
    st.markdown(f"**Location:** {CONTACT_INFO['Location']}")
    st.markdown(f"**Email:** [{CONTACT_INFO['Email']}](mailto:{CONTACT_INFO['Email']})")
    st.markdown(
        f"**LinkedIn:** [{CONTACT_INFO['LinkedIn']}](https://{CONTACT_INFO['LinkedIn']})"
    )

    # =================================================================================
    # --- FOOTER ---
    # =================================================================================
    current_date = dt.now().strftime("%B %Y")
    st.markdown(
        f"""
        <div class="custom-footer">
            <p>Developed by Mohammed Al-Dokimi | {current_date}</p>
        </div>
        """,
        unsafe_allow_html=True,
    )
