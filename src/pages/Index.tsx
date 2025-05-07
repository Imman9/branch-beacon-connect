
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/ui-custom/Hero";
import Section from "@/components/ui-custom/Section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Mic, Music, Newspaper } from "lucide-react";

const Index = () => {
  const { authState } = useAuth();
  
  return (
    <Layout>
      <Hero
        title="Welcome to Church Connect"
        subtitle="A platform that brings your church community together"
        imageUrl="https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        primaryAction={!authState.isAuthenticated ? { label: "Join Us", href: "/register" } : undefined}
        secondaryAction={!authState.isAuthenticated ? { label: "Learn More", href: "#features" } : undefined}
      >
        <p className="text-lg text-muted-foreground">
          Connect with multiple branches, access sermons, participate in events, 
          and stay updated with church activities all in one place.
        </p>
      </Hero>
      
      <Section
        id="features"
        title="Our Features"
        subtitle="Everything you need to connect and grow with your church community"
        className="bg-muted/50 py-16"
      >
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 border-church-100 bg-white">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-church-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-church-600" />
              </div>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>
                Stay updated with upcoming church events across all branches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Calendar integration</li>
                <li>Event registrations</li>
                <li>Reminders and notifications</li>
                <li>Branch-specific events</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/events" className="w-full">
                <Button variant="outline" className="w-full">Explore Events</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-church-100 bg-white">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-church-100 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-church-600" />
              </div>
              <CardTitle>Sermons & Media</CardTitle>
              <CardDescription>
                Access and listen to sermons with AI-powered transcription and summaries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Video and audio sermons</li>
                <li>AI-powered transcription</li>
                <li>Sermon summaries</li>
                <li>Search functionality</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/sermons" className="w-full">
                <Button variant="outline" className="w-full">Explore Sermons</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-church-100 bg-white">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-church-100 flex items-center justify-center mb-4">
                <Newspaper className="h-6 w-6 text-church-600" />
              </div>
              <CardTitle>Announcements & Blog</CardTitle>
              <CardDescription>
                Stay informed with important church announcements and blog posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Important announcements</li>
                <li>Blog articles and news</li>
                <li>Priority notifications</li>
                <li>Branch-specific updates</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/announcements" className="w-full">
                <Button variant="outline" className="w-full">View Updates</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-church-100 bg-white">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-church-100 flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-church-600" />
              </div>
              <CardTitle>Music Library</CardTitle>
              <CardDescription>
                Access a collection of worship music, hymns, and performances.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Audio and video recordings</li>
                <li>Downloadable content</li>
                <li>Organized by genre and artist</li>
                <li>Song lyrics and chords</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/music" className="w-full">
                <Button variant="outline" className="w-full">Explore Music</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-church-100 bg-white">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-church-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-church-600" />
              </div>
              <CardTitle>Community Forums</CardTitle>
              <CardDescription>
                Engage in discussions with your church community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Topic-based discussions</li>
                <li>Branch-specific forums</li>
                <li>Moderated conversations</li>
                <li>Prayer requests and responses</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/forums" className="w-full">
                <Button variant="outline" className="w-full">Join Discussions</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-2 border-church-100 bg-white church-gradient text-white">
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
                </svg>
              </div>
              <CardTitle className="text-white">Multi-Branch Management</CardTitle>
              <CardDescription className="text-white/80">
                Access content specific to your church branch and location.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-white/80">
              <ul className="list-disc list-inside space-y-1">
                <li>Branch-specific dashboards</li>
                <li>Admin controls per branch</li>
                <li>Customized content</li>
                <li>Easy branch switching</li>
              </ul>
            </CardContent>
            <CardFooter>
              {!authState.isAuthenticated ? (
                <Link to="/register" className="w-full">
                  <Button variant="secondary" className="w-full bg-white text-church-800 hover:bg-white/90">
                    Join Now
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard" className="w-full">
                  <Button variant="secondary" className="w-full bg-white text-church-800 hover:bg-white/90">
                    Go to Dashboard
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>
      </Section>
      
      <Section
        title="Join Our Community"
        subtitle="Connect with believers, access resources, and grow in your faith"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-8">
            Church Connect helps you stay connected to your church family, access powerful spiritual resources, 
            and engage with your community across multiple church branches.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {!authState.isAuthenticated ? (
              <>
                <Link to="/register">
                  <Button size="lg" className="church-gradient">Create Account</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">Sign In</Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" className="church-gradient">Go to Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Index;
