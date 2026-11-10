import type { IconCategory, IconDefinitionInput } from "./types";

const synonyms: Record<string, string[]> = {
  ChevronUp:["collapse"],ChevronDown:["expand","dropdown"],ExternalLink:["open in new tab","launch"],MoreHorizontal:["overflow","options"],MoreVertical:["overflow","options"],
  Employees:["staff","people","team"],Manager:["supervisor","lead"],Recruitment:["hiring","talent","jobs"],Interview:["hiring","candidate"],CheckIn:["clock in","start shift","presence"],CheckOut:["clock out","end shift"],Holiday:["day off","calendar"],Timesheet:["hours","work log","time"],Performance:["review","goals","evaluation"],Organization:["org chart","company"],Department:["team","division"],
  Contact:["person","address book"],Brand:["identity","trademark"],Franchise:["location","operator","network"],Opportunity:["prospect","sales","deal"],Partnership:["collaboration","alliance"],Growth:["increase","trend","scale"],Location:["pin","place","map"],Store:["shop","franchise","branch"],
  Announcement:["broadcast","news"],Inbox:["mailbox","messages"],Reply:["respond","email"],ForwardEmail:["send on","email"],Mention:["at","tag","person"],VideoCall:["camera","meeting"],
  PDF:["document","portable document"],Spreadsheet:["sheet","table","data"],Presentation:["slides","deck"],Attachment:["paperclip","file"],FileUpload:["import","upload"],FileDownload:["export","download"],Template:["starter","layout"],Clipboard:["pasteboard","copy"],
  Wallet:["money","purse"],Payment:["pay","transaction"],Receipt:["proof of purchase","transaction"],Bank:["account","institution"],Card:["credit","debit"],Money:["cash","currency"],Revenue:["income","sales"],Expense:["cost","spending"],Budget:["plan","allocation"],Tax:["duty","percentage"],Percentage:["percent","rate"],
  BarChart:["graph","comparison"],LineChart:["graph","series"],PieChart:["graph","share"],AreaChart:["graph","volume"],Report:["document","summary"],TrendUp:["increase","growth"],TrendDown:["decrease","decline"],KPI:["metric","indicator"],Insights:["analysis","spark"],
  Permission:["access","authorization"],Unlock:["open","security"],Key:["credential","access"],Server:["hosting","infrastructure"],API:["endpoint","developer"],Cloud:["hosting","online"],Backup:["restore","archive"],Code:["developer","source"],Terminal:["command line","console"],
  Warning:["caution","attention"],Information:["info","details"],Help:["support","question"],Offline:["disconnected","network"],Online:["connected","network"],Pending:["waiting","progress"],Blocked:["restricted","error"],
  Image:["photo","picture"],Camera:["photo","capture"],Video:["movie","media"],Play:["start","media"],Pause:["hold","media"],Stop:["end","media"],Eye:["view","visible"],EyeOff:["hide","hidden"],Star:["favorite","rating"],Heart:["favorite","like"],Bookmark:["save","mark"],Link:["url","chain"],Map:["geography","place"],Clock:["time","duration"]
};
const words = (value: string) => value.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().split(/[\s-]+/).filter(Boolean);
const define = (name: string, category: IconCategory, meaning: string, ...paths: string[]): IconDefinitionInput => ({
  name, slug: name.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(), category,
  description: meaning, paths, tags: [...new Set([...words(name), ...words(category), ...(synonyms[name] ?? [])])],
});

// Additions are authored on the shared grid; softened internal corners and short open rails carry the family signature.
export const expandedIcons: IconDefinitionInput[] = [
  // Navigation
  define("ChevronUp","Navigation","Move to the previous or upper item.","m6.5 14.5 5.5-5 5.5 5"),
  define("ChevronLeft","Navigation","Move to the previous item in a sequence.","m14.5 6.5-5 5.5 5 5.5"),
  define("ArrowUp","Navigation","Move content or focus upward.","M12 19V5","m6.75 10.25 5.25-5.25 5.25 5.25"),
  define("ArrowDown","Navigation","Move content or focus downward.","M12 5v14","m17.25 13.75L12 19l-5.25-5.25"),
  define("ArrowLeft","Navigation","Move content or focus to the left.","M19 12H5","m10.25 17.25L5 12l5.25-5.25"),
  define("ArrowRight","Navigation","Move content or focus to the right.","M5 12h14","m13.75 6.75L19 12l-5.25 5.25"),
  define("ExternalLink","Navigation","Open the destination in a new context.","M13 5h6v6","M19 5l-8 8","M17.5 13.5v4q0 1.5-1.5 1.5h-9q-1.5 0-1.5-1.5v-9q0-1.5 1.5-1.5h4"),
  define("Sidebar","Navigation","Show or hide the side navigation.","M4.5 5.5h15v13h-15z","M9.5 5.5v13","M12.5 9h4"),
  define("Expand","Navigation","Expand a view to its full size.","M8.5 4.5h-3q-1 0-1 1v3","m4.5 4.5 5 5","M15.5 4.5h3q1 0 1 1v3","m19.5 4.5-5 5","M8.5 19.5h-3q-1 0-1-1v-3","m4.5 19.5 5-5","M15.5 19.5h3q1 0 1-1v-3","m19.5 19.5-5-5"),
  define("Collapse","Navigation","Return an expanded view to its fitted size.","M9.5 4.5v4q0 1-1 1h-4","m4.5 9.5 5-5","M14.5 4.5v4q0 1 1 1h4","m19.5 9.5-5-5","M9.5 19.5v-4q0-1-1-1h-4","m4.5 14.5 5 5","M14.5 19.5v-4q0-1 1-1h4","m19.5 14.5-5 5"),
  define("MoreHorizontal","Navigation","Open additional actions.","M5.5 12h.01","M12 12h.01","M18.5 12h.01"),
  define("MoreVertical","Navigation","Open additional actions.","M12 5.5v.01","M12 12v.01","M12 18.5v.01"),

  // Actions
  define("Remove","Actions","Remove an item from a selection.","M5 12h14"),
  define("Paste","Actions","Insert the item held on the clipboard.","M8 5.5h-2q-1.5 0-1.5 1.5v12q0 1.5 1.5 1.5h12q1.5 0 1.5-1.5V7q0-1.5-1.5-1.5h-2","M9 4h6v4H9z","M9 12h6"),
  define("Print","Actions","Print the current page or document.","M7 8V4.5h10V8","M7 17H5.5Q4 17 4 15.5v-5Q4 9 5.5 9h13q1.5 0 1.5 1.5v5q0 1.5-1.5 1.5H17","M7 14h10v5.5H7z","M17 11.5h.01"),
  define("Undo","Actions","Reverse the most recent change.","M9 8 5 12l4 4","M5.5 12h8a5 5 0 0 1 5 5"),
  define("Redo","Actions","Restore the most recently reversed change.","m15 8 4 4-4 4","M18.5 12h-8a5 5 0 0 0-5 5"),
  define("Cancel","Actions","Cancel the current action.","M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z","m9 9 6 6","m15 9-6 6"),
  define("Restore","Actions","Restore an item to its previous state.","M5 8.5V4.75","m5 4.75 3 2.5","M5.5 7.5A7.5 7.5 0 1 1 4.5 13"),
  define("Move","Actions","Move an item to another location.","M12 4v16","M4 12h16","m9 7 3-3 3 3","m9 17 3 3 3-3","m7 9-3 3 3 3","m17 9 3 3-3 3"),

  // People and HRMS
  define("Employees","HRMS","Represent a group of employees.","M9 10.5a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z","M4 19a5 5 0 0 1 10 0","M16 10a2.5 2.5 0 1 0-1.6-4.4","M16 14a5 5 0 0 1 4 4.75"),
  define("Manager","HRMS","Represent a manager or team lead.","M12 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M5 19.5a7 7 0 0 1 14 0","M17.5 5v4","M15.5 7h4"),
  define("Recruitment","HRMS","Manage hiring and recruitment activity.","M4.5 6.5h15v13h-15z","M8 4.5v4","M16 4.5v4","M4.5 10h15","M9 14h6","m10 17 1.5 1.5L15 15"),
  define("Interview","HRMS","Schedule or conduct a candidate interview.","M4.5 5.5h15v11h-9l-5 3v-14Z","M9 10h.01","M12 10h.01","M15 10h.01","M9 13h6"),
  define("CheckIn","HRMS","Record the start of a work shift.","M12 4v10","m8.5 10.5 3.5 3.5 3.5-3.5","M5 17v2.5h14V17"),
  define("CheckOut","HRMS","Record the end of a work shift.","M12 14V4","m8.5 7.5 3.5-3.5 3.5 3.5","M5 17v2.5h14V17"),
  define("Holiday","HRMS","Mark a holiday or non-working day.","M4.5 6.5h15v13h-15z","M8 4.5v4","M16 4.5v4","M4.5 10h15","M12 12.5v2.5","M12 17h.01"),
  define("Timesheet","HRMS","Review hours recorded on a timesheet.","M5 4.5h14v16H5z","M8.5 8h7","M8.5 11.5h7","M8.5 15h3","M16 15v3"),
  define("Performance","HRMS","Review employee performance and goals.","M4.5 19.5h15","M6.5 16v-4","M11 16V8","M15.5 16V5","M6 8.5l4-3 4 1.5 4-3"),
  define("Organization","HRMS","Show reporting relationships across an organization.","M9 4.5h6v4H9z","M4.5 16h5v4h-5z","M14.5 16h5v4h-5z","M12 8.5v4","M7 12.5h10","M7 12.5V16","M17 12.5V16"),
  define("Department","HRMS","Represent a business department.","M4.5 7h15v12.5h-15z","M8 7V4.5h8V7","M8 11h8","M8 14.5h4"),

  // CRM and business
  define("Contact","CRM","Open a person’s contact details.","M10 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z","M4.5 19.5a5.5 5.5 0 0 1 11 0","M17 8h3.5","M17 11h3.5","M17 14h2"),
  define("Brand","Business","Represent a brand or brand identity.","M12 4.5 14 9l5 .5-3.75 3.25 1.1 4.75L12 15l-4.35 2.5 1.1-4.75L5 9.5 10 9Z","M12 15v4.5"),
  define("Franchise","Business","Represent a franchise location in a network.","M12 20s6-5.2 6-10.5a6 6 0 1 0-12 0C6 14.8 12 20 12 20Z","M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z","M18 18.5h2"),
  define("Opportunity","CRM","Track a promising sales opportunity.","M5 18.5 10 13l3 2.5 6-7","M15.5 8.5H19v3.5","M4.5 20h15"),
  define("Partnership","Business","Show a partnership between two organizations.","M7 8.5 12 5l5 3.5-5 3.5-5-3.5Z","M7 8.5v6L12 18l5-3.5v-6","M4.5 11l2.5 1.5","M19.5 11 17 12.5","M9 15l3 2","M15 15l-3 2"),
  define("Growth","Business","Show business growth over time.","M4.5 18.5h15","M6.5 15.5l4-4 3 2.5 5-6","M14.5 8h4v4"),
  define("Location","Business","Mark a place or business location.","M12 20s6-5.2 6-10.5a6 6 0 1 0-12 0C6 14.8 12 20 12 20Z","M12 12a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"),
  define("Store","Business","Represent a retail store or franchise branch.","M5 10v9.5h14V10","M4 9.5l1.5-5h13L20 9.5","M4 9.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0","M9 19.5v-5h6v5"),

  // Communication
  define("Announcement","Communication","Broadcast an update to a group.","M4.5 10v4h3l9 4V6l-9 4h-3Z","M7.5 14l1.5 5h3l-2-4.3","M19 9.5a4 4 0 0 1 0 5"),
  define("Inbox","Communication","Review messages in the inbox.","M4.5 5.5h15l2 10v3h-19v-3l2-10Z","M4 14h4l1.5 2.5h5L16 14h4"),
  define("Reply","Communication","Reply to a message or email.","M10 8 5 12l5 4","M5.5 12h7a5.5 5.5 0 0 1 5.5 5.5"),
  define("ForwardEmail","Communication","Forward a message to another person.","M14 8 19 12l-5 4","M18.5 12h-7A5.5 5.5 0 0 0 6 17.5"),
  define("Mention","Communication","Reference a teammate in a conversation.","M15.5 12a3.5 3.5 0 1 1-1-2.5v4a2 2 0 0 0 4 0v-1.5a6.5 6.5 0 1 0-2 4.7"),
  define("VideoCall","Communication","Start or join a video call.","M4.5 7h10q1.5 0 1.5 1.5v7q0 1.5-1.5 1.5h-10Q3 17 3 15.5v-7Q3 7 4.5 7Z","M16 10l5-2v8l-5-2"),

  // Documents
  define("Folder","Documents","Open a folder of related files.","M3.5 7q0-1.5 1.5-1.5h5l2 2h7q1.5 0 1.5 1.5v8.5q0 1.5-1.5 1.5H5q-1.5 0-1.5-1.5V7Z","M4 10h16"),
  define("OpenFolder","Documents","Show the contents of an open folder.","M3.5 8h6l2 2h8q1.5 0 1.1 1.4l-1.5 6.1q-.3 1-1.4 1H5q-1.5 0-1.5-1.5V8Z","M4 11h16"),
  define("PDF","Documents","Identify a PDF document.","M6 4.5h8l4 4v11H6z","M14 4.5v4h4","M8.5 15.5v-4h1.25a1.25 1.25 0 0 1 0 2.5H8.5","M13 11.5v4h1a2 2 0 0 0 0-4h-1","M17 11.5h-2v4"),
  define("Spreadsheet","Documents","Represent tabular spreadsheet data.","M4.5 5.5h15v13h-15z","M4.5 10h15","M4.5 14.5h15","M9.5 5.5v13","M14.5 5.5v13"),
  define("Presentation","Documents","Represent a presentation or slide deck.","M4.5 5.5h15v11h-15z","M12 16.5v3","M8.5 19.5h7","M8 9.5h8","M8 12.5h5"),
  define("Attachment","Documents","Show a file attached to a message.","m14.5 7-6.8 6.8a2.5 2.5 0 0 0 3.5 3.5l7-7a4.25 4.25 0 0 0-6-6l-7.5 7.5a6 6 0 0 0 8.5 8.5l5.5-5.5"),
  define("FileUpload","Documents","Upload a document or other file.","M6 8h12v11H6z","M12 15V4","m8.5 7.5 3.5-3.5 3.5 3.5"),
  define("FileDownload","Documents","Download a document or other file.","M6 5h12v11H6z","M12 9v11","m8.5 16.5 3.5 3.5 3.5-3.5"),
  define("Archive","Documents","Store a file safely for later reference.","M4.5 5h15v4h-15z","M6 9v10h12V9","M9 13h6"),
  define("Template","Documents","Start from a reusable document template.","M5 4.5h14v15H5z","M8 8h3v3H8z","M13 8h3","M13 11h3","M8 14h8","M8 17h8"),
  define("Clipboard","Documents","Hold copied content temporarily.","M8 5h-2q-1.5 0-1.5 1.5v13Q4.5 21 6 21h12q1.5 0 1.5-1.5v-13Q19.5 5 18 5h-2","M9 3.5h6v4H9z","M8 12h8","M8 16h5"),

  // Finance
  define("Wallet","Finance","View available funds in a wallet.","M4.5 6.5h13q2 0 2 2v10h-15q-1.5 0-1.5-1.5V7q0-1.5 1.5-1.5Z","M4.5 8h15v-1q0-1.5-1.5-1.5H7","M15.5 12h4v3h-4a1.5 1.5 0 0 1 0-3Z","M16.5 13.5h.01"),
  define("Payment","Finance","Record or send a payment.","M4.5 6h15v12h-15z","M4.5 10h15","M8 14h3","M16 14h.01"),
  define("Receipt","Finance","Keep a record of a completed transaction.","M6 3.5h12v17l-3-2-3 2-3-2-3 2z","M9 8h6","M9 12h6","M9 16h3"),
  define("Bank","Finance","Represent a bank or financial institution.","m4 9 8-5 8 5Z","M5.5 10v7","M9.75 10v7","M14.25 10v7","M18.5 10v7","M4 19h16"),
  define("Card","Finance","Represent a payment or bank card.","M4.5 5.5h15q1 0 1 1v11q0 1-1 1h-15q-1 0-1-1v-11q0-1 1-1Z","M3.5 9.5h17","M7 14h3"),
  define("Money","Finance","Represent cash or a money amount.","M4.5 6h15v12h-15z","M12 8.5v7","M14 10h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3"),
  define("Revenue","Finance","Track income earned by a business.","M4.5 19h15","M6.5 15.5l4-4 3 2.5 5-6","M14.5 8h4v4"),
  define("Expense","Finance","Track business costs and spending.","M5 5.5h14v14H5z","M8 9h8","M8 12.5h5","M8 16h6","m16 15 2 2"),
  define("Budget","Finance","Plan the allocation of available funds.","M4.5 6h15v12h-15z","M8 10h8","M8 14h3","M15 12v5"),
  define("Tax","Finance","Represent tax calculations and records.","M5 5h14v14H5z","M8 9h.01","M16 15h.01","m8 16 8-8"),
  define("Percentage","Finance","Show a percentage or rate.","M6.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z","M17.5 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z","m6 19 12-14"),

  // Analytics
  define("BarChart","Analytics","Compare values in a bar chart.","M4.5 19.5h15","M6.5 16v-4h3v4","M11 16V7h3v9","M15.5 16v-6h3v6"),
  define("LineChart","Analytics","Show data change over time.","M4.5 19.5h15","m5.5 15 4-4 3 2.5 5-6","M14.5 7.5h3.5V11"),
  define("PieChart","Analytics","Show proportions within a whole.","M11 4.5a7.5 7.5 0 1 0 8.5 8.5H11z","M14 4.75V10h5.25A7.5 7.5 0 0 0 14 4.75Z"),
  define("AreaChart","Analytics","Show volume and movement over time.","M4.5 19.5h15","M5 16l4-4 3 2 5-6 2 2v9H5z","M16 8h3v3"),
  define("Report","Analytics","Review a structured performance report.","M5.5 3.5h9l4 4v13h-13z","M14.5 3.5v4h4","M8.5 12h7","M8.5 15h7","M8.5 18h4"),
  define("TrendUp","Analytics","Show an upward trend.","M5 17l5-5 3 3 6-7","M14 8h5v5"),
  define("TrendDown","Analytics","Show a downward trend.","M5 7l5 5 3-3 6 7","M14 16h5v-5"),
  define("KPI","Analytics","Highlight a key performance indicator.","M12 4.5v3","M12 16.5v3","M4.5 12h3","M16.5 12h3","M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"),
  define("Insights","Analytics","Surface a useful business insight.","M12 4.5a6 6 0 0 0-3.5 10.9v2.1h7v-2.1A6 6 0 0 0 12 4.5Z","M9 20h6","M10 17.5v-2","M14 8l-3 4h3l-2 3"),

  // System and technology
  define("Permission","System","Show access permissions for a user or role.","M12 3.5 20 7v5c0 4.5-3.2 7.2-8 9-4.8-1.8-8-4.5-8-9V7z","M9 12h6","M12 9v6"),
  define("Unlock","System","Show that protected access is open.","M5 10h14v10H5z","M8 10V7a4 4 0 0 1 7.7-1.5","M12 14v2"),
  define("Key","System","Represent a credential or access key.","M14.5 9.5a4 4 0 1 0-7.8 1.2 4 4 0 0 0 7.8-1.2Z","m14 12 6.5 6.5","M17 15l-2 2","M19 17l-2 2"),
  define("Server","System","Represent a server or hosted service.","M4.5 4.5h15v6h-15z","M4.5 13.5h15v6h-15z","M8 7.5h.01","M8 16.5h.01","M12 7.5h4","M12 16.5h4"),
  define("API","System","Represent a software API connection.","M5 5.5h14v13H5z","M8 9l2 2-2 2","M12 13h4","M8 16h8"),
  define("Cloud","System","Represent cloud-hosted services.","M7 18.5h10a4 4 0 0 0 .2-8 5.5 5.5 0 0 0-10.4-1.2A4.6 4.6 0 0 0 7 18.5Z"),
  define("Backup","System","Create or restore a data backup.","M4.5 12a7.5 7.5 0 1 0 2.1-5.2","M4.5 5v4h4","M12 8v4l3 2","M17 17.5h3v3"),
  define("Code","System","Represent code or software development.","m8.5 8-4 4 4 4","m15.5 8 4 4-4 4","m13.5 6-3 12"),
  define("Terminal","System","Open a command line terminal.","M4.5 5.5h15v13h-15z","m8 9 3 3-3 3","M13.5 15h3"),

  // Status
  define("Warning","Status","Call attention to a potential issue.","M12 4.5 20 19H4z","M12 10v4","M12 16.5h.01"),
  define("Information","Status","Provide helpful contextual information.","M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z","M12 11v5","M12 8h.01"),
  define("Help","Status","Open help or support information.","M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z","M9.5 9a2.5 2.5 0 1 1 4.3 1.75c-1 .95-1.8 1.25-1.8 2.75","M12 16.5h.01"),
  define("Offline","Status","Indicate a disconnected or offline state.","M5 9a11 11 0 0 1 14 0","M8 12a6.5 6.5 0 0 1 8 0","M10.5 15a2.5 2.5 0 0 1 3 0","M12 18h.01","M4 4l16 16"),
  define("Online","Status","Indicate an active online connection.","M4.5 8a12 12 0 0 1 15 0","M7.5 11a7.5 7.5 0 0 1 9 0","M10.5 14a3 3 0 0 1 3 0","M12 18h.01"),
  define("Pending","Status","Show that an item is waiting for a decision.","M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z","M12 8v4l3 2"),
  define("Blocked","Status","Indicate that an action cannot continue.","M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z","M8 16l8-8"),

  // Media and miscellaneous
  define("Image","Media","Represent an image or photograph.","M4.5 5.5h15v13h-15z","m5 16 4-4 3 3 2-2 5 5","M15.5 9h.01"),
  define("Camera","Media","Capture a photo or video.","M4 8h3l1.5-2.5h7L17 8h3v10.5H4z","M12 15.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"),
  define("Video","Media","Open or share a video.","M4.5 7h10q1.5 0 1.5 1.5v7q0 1.5-1.5 1.5h-10Q3 17 3 15.5v-7Q3 7 4.5 7Z","M16 10l5-2v8l-5-2"),
  define("Play","Media","Start media playback.","M8 5.5v13l10-6.5z"),
  define("Pause","Media","Pause media playback.","M7 5.5h3.5v13H7z","M13.5 5.5H17v13h-3.5z"),
  define("Stop","Media","Stop media playback.","M6.5 6.5h11v11h-11z"),
  define("Eye","Media","Show a visible preview.","M3.5 12s3.1-5.5 8.5-5.5 8.5 5.5 8.5 5.5-3.1 5.5-8.5 5.5S3.5 12 3.5 12Z","M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"),
  define("EyeOff","Media","Hide a preview or sensitive content.","M4 4l16 16","M10.5 6.75A8 8 0 0 1 12 6.5c5.4 0 8.5 5.5 8.5 5.5a14 14 0 0 1-2.5 3.1","M6.2 8.1C4.45 9.3 3.5 12 3.5 12s3.1 5.5 8.5 5.5c.8 0 1.55-.12 2.25-.35","M10 10a2.8 2.8 0 0 0 4 4"),
  define("Star","Media","Mark an item as a favorite or rating.","m12 4.5 2.35 4.75 5.25.75-3.8 3.7.9 5.3-4.7-2.5-4.7 2.5.9-5.3-3.8-3.7 5.25-.75z"),
  define("Heart","Media","Mark content as liked or important.","M12 19.5 5 12.8a4.2 4.2 0 0 1 5.95-5.95L12 7.9l1.05-1.05A4.2 4.2 0 0 1 19 12.8z"),
  define("Bookmark","Media","Save a place or item for later.","M6.5 4.5h11v15l-5.5-3.5-5.5 3.5z"),
  define("Link","Media","Represent a shareable link or URL.","M9.5 14.5l5-5","M8 16H7a4 4 0 0 1 0-8h4","M16 8h1a4 4 0 0 1 0 8h-4"),
  define("Map","Media","Show a map or geographic area.","M4.5 6.5 10 4l4 2 5.5-2v13.5L14 20l-4-2-5.5 2z","M10 4v14","M14 6v14","M7 10h.01"),
  define("Clock","Media","Show a time or duration.","M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z","M12 8v4l3 2")
];
