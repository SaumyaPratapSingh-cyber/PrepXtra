import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from './types';

// Register fonts if needed, but standard fonts work best for ATS
// Font.register({ family: 'Open Sans', src: '...' });

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Times-Roman',
        fontSize: 11,
        lineHeight: 1.2,
    },
    header: {
        marginBottom: 10,
        textAlign: 'center',
    },
    name: {
        fontSize: 24,
        fontFamily: 'Times-Roman', // Using Times-Roman for the name as well
        marginBottom: 4,
    },
    contactInfo: {
        fontSize: 10,
        marginBottom: 4,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Times-Bold',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    leftCol: {
        flex: 1,
    },
    rightCol: {
        textAlign: 'right',
    },
    bold: {
        fontFamily: 'Times-Bold',
    },
    italic: {
        fontFamily: 'Times-Italic',
    },
    bulletPoint: {
        marginLeft: 10,
        fontSize: 10,
        marginBottom: 1,
    },
    bullet: {
        width: 10, // Adjust spacing for bullet
    },
    bulletContent: {
        flex: 1,
    },
    projectTitle: {
        fontFamily: 'Times-Bold',
    },
    techStack: {
        fontFamily: 'Times-Italic',
        fontSize: 10,
    }
});

interface ResumePDFProps {
    data: ResumeData;
}

const ResumePDF = ({ data }: ResumePDFProps) => {
    const { personal, education, experience, projects, skills } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.fullName}</Text>
                    <Text style={styles.contactInfo}>
                        {personal.email} | {personal.phone} | {personal.location}
                        {personal.linkedin ? ` | ${personal.linkedin.replace('https://', '')}` : ''}
                        {personal.github ? ` | ${personal.github.replace('https://', '')}` : ''}
                        {personal.website ? ` | ${personal.website.replace('https://', '')}` : ''}
                    </Text>
                </View>

                {/* Education */}
                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu) => (
                            <View key={edu.id} style={{ marginBottom: 4 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{edu.institution}</Text>
                                    <Text>{edu.location}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.italic}>{edu.degree}</Text>
                                    <Text>{edu.startDate} – {edu.endDate}</Text>
                                </View>
                                {edu.gpa && <Text style={{ fontSize: 10, marginLeft: 0 }}>GPA: {edu.gpa}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp) => (
                            <View key={exp.id} style={{ marginBottom: 6 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>{exp.company}</Text>
                                    <Text>{exp.startDate} – {exp.endDate}</Text>
                                </View>
                                <View style={[styles.row, { marginBottom: 2 }]}>
                                    <Text style={styles.italic}>{exp.role}</Text>
                                    <Text>{exp.location}</Text>
                                </View>
                                {exp.description.map((desc, i) => (
                                    <View key={i} style={{ flexDirection: 'row', marginBottom: 1 }}>
                                        <Text style={{ width: 10, marginLeft: 5 }}>•</Text>
                                        <Text style={{ flex: 1, fontSize: 10 }}>{desc}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((proj) => (
                            <View key={proj.id} style={{ marginBottom: 6 }}>
                                <View style={styles.row}>
                                    <Text style={styles.bold}>
                                        {proj.name}
                                        {proj.technologies && <Text style={styles.techStack}> | {proj.technologies}</Text>}
                                    </Text>
                                    {/* Link could go here if needed, but usually incorporated or just hidden if long */}
                                </View>
                                {proj.description.map((desc, i) => (
                                    <View key={i} style={{ flexDirection: 'row', marginBottom: 1 }}>
                                        <Text style={{ width: 10, marginLeft: 5 }}>•</Text>
                                        <Text style={{ flex: 1, fontSize: 10 }}>{desc}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technical Skills</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={[styles.bold, { width: 100 }]}>Languages:</Text>
                        <Text style={{ flex: 1 }}>{skills.technical.join(', ')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={[styles.bold, { width: 100 }]}>Frameworks:</Text>
                        <Text style={{ flex: 1 }}>{skills.tools.join(', ')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                        <Text style={[styles.bold, { width: 100 }]}>Developer Tools:</Text>
                        <Text style={{ flex: 1 }}>{skills.languages.join(', ')}</Text>
                    </View>
                    {/* If Soft skills are present */}
                    {skills.soft.length > 0 && (
                        <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                            <Text style={[styles.bold, { width: 100 }]}>Soft Skills:</Text>
                            <Text style={{ flex: 1 }}>{skills.soft.join(', ')}</Text>
                        </View>
                    )}
                </View>

            </Page>
        </Document>
    );
};

export default ResumePDF;
