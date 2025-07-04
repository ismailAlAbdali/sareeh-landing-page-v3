CREATE TABLE IF NOT EXISTS demo_requests (
  id BIGSERIAL PRIMARY KEY,
  businessname TEXT NOT NULL,
  contactname TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry TEXT NOT NULL,
  otherindustry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()) NOT NULL
);

-- Create a notification function
CREATE OR REPLACE FUNCTION notify_new_demo_request()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(
    'new_demo_request',
    json_build_object(
      'id', NEW.id,
      'businessname', NEW.businessname,
      'contactname', NEW.contactname,
      'email', NEW.email,
      'phone', NEW.phone,
      'industry', NEW.industry,
      'otherindustry', NEW.otherindustry
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger for notifications
DROP TRIGGER IF EXISTS demo_request_notify ON demo_requests;
CREATE TRIGGER demo_request_notify
  AFTER INSERT ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_demo_request();